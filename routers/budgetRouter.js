const budgetRouter = require('express').Router();

module.exports = budgetRouter;

const category = [];


// show all categories
budgetRouter.get('/', (req, res, next) => {
    res.send({category: category});
})


// show categories by id
budgetRouter.get('/:id', (req, res, next) => {
    const { id } = req.params;

    const catName = category.find(cat => cat.title === id);

    if(!catName) {
        return res.status(404).send('category name does not exist');
    }

    return res.status(200).send({category: catName});
})


//create category 
budgetRouter.post('/', (req, res, next) => {
    const { title, amount } = req.body;
    const catAmount = Number(amount);

    if(title === "" || amount === "" || typeof(amount) !== "number") {
        return res.status(400).send('Invalid input');
    }

    const newCat = {
        title,
        amount: catAmount
    }

    const duplicateCat = category.find(cat => cat.title === newCat.title);
    if(duplicateCat) {
        return res.status(409).send('duplicate category');
    }

    category.push(newCat);
    return res.status(201).send('new category added');

})


// update category
budgetRouter.put('/:id', (req, res, next) => {
    const { title, amount } = req.body;
    const { id } = req.params;

    const catName = category.find(cat => cat.title === id);

    if(!catName) {
        return res.status(404).send('category title does not exist');
    }
    
    const catIndex = category.findIndex(cat => cat.title === id);
    
    const updateCat = {
        title,
        amount
    }

    if(catIndex !== -1) {
        category[catIndex] = updateCat;
        return res.status(200).send('categoty has been updated');
    }

    return res.status(500).send('something wrong, cannot be updated');
})


// delete category by id
budgetRouter.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    const catId = category.find(cat => cat.title === id);
    const catIndex = category.findIndex(cat => cat.title === id);

    if(!catId) {
        return res.status(404).send('category title does not exist');
    }

    if(catIndex !== -1) {
        category.splice(catIndex,1);
        return res.status(204).send('category has been deleted!');
    }

    return res.status(500).send('something wrong, cannot be updated');

})


// transfer budget
budgetRouter.post('/transfer/:id1/:id2', (req, res, next) => {
    const { id1, id2 } = req.params;
    const { amount } = req.body;
    
    const catId1 = category.find(cat => cat.title === id1);
    const catId2 = category.find(cat => cat.title === id2);

    if(!catId1 || !catId2) {
        return res.status(400).send('category title does not exist');
    }

    if(amount > catId1.amount){
        return res.status(400).send('insufficient balance')
    }    
    catId1.amount -= amount;
    catId2.amount += amount;

    return res.status(201).send('transfer done')

})