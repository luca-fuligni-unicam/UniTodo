const Todo = require("./../models/todoModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.getAllTodos =catchAsync(async(req, res, next) => {
    const features = new APIFeatures(Todo.find({userId: req.authId}), req.query)
    .filter()
    .paginate()
    .sort()
    .limitFields();

    const todos =await features.query;

    res.status(200).json({
      status: "success",
      results: todos.length,
      data: {
        todo: todos
      }
    });
});

exports.createTodo = catchAsync(async (req, res, next) => {
    req.body.userId = req.authId;
    const newTodo = await Todo.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        todo: newTodo
      }
    });
});

exports.getTodo = catchAsync(async (req, res, next) => {

    const todo = await Todo.findById(req.params.id);

    if(!todo){ return next(new AppError("No todo found with that ID",404))}
    if(todo.userId !== req.authId){ return next(new AppError("You are not authorized to view this todo", 401))}

    res.status(200).json({
      status: "success",
      data: {
        todo
      }
    });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if(!todo){ return next(new AppError("No todo found with that ID",404))}
    if(todo.userId !== req.authId){ return next(new AppError("You are not authorized to update this todo", 401))}



    res.status(200).json({
      status: "success",
      data: {
        todo
      }
    });

});

exports.deleteTodo = catchAsync(async (req, res, next) => {

        const todo = await Todo.findByIdAndDelete(req.params.id);
    
        if(!todo){ return next(new AppError("No todo found with that ID",404))}
        if(todo.userId !== req.authId){ return next(new AppError("You are not authorized to delete this todo", 401))}

        res.status(204).json({
          status: 'success',
          data: null
        });
});
