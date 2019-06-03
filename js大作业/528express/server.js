console.log("ok");
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/jsbigwork',{useNewUrlParser:true})
const User=mongoose.model('User',new mongoose.Schema({
	name:String,
	password:String,
	usetime:String,
}))
const express=require('express')
const app=express()
app.use(express.json())
app.use(express.static('public'))
app.use(require('cors')())

//http://localhost:4000/
app.post('/api/denglu',async (req,res)=>{
	var u=req.body.name;
	var p=req.body.password;
	var data=await User.find();
	var flag=0;
	var tttt={}
	for(var i=0;i<data.length;i++){
		if(data[i].name===u){
			if(p===data[i].password){
				flag=1;
				tttt={
					"st":"success"
				}
			}
			
		}
	}
	if(flag===0){
		tttt={
			"st":"unsuccess"
		}
	}
	res.send(tttt);
})
app.post('/api/look',async (req,res)=>{
	const data=await User.find();
	res.send(data)
})
app.delete('/api/delete/:id',async function(req,res){
	const pp=await User.findById(req.params.id);
	await pp.remove();
})
app.post('/api/findpaihang',async (req,res)=>{
	var data=await User.find();
	res.send(data);
})
app.put('/api/xiugai',async (req,res)=>{
	var n=req.body.name;
	var t=req.body.time;
	var data=await User.find();
	var id;
	var t2;
	for(var i=0;i<data.length;i++){
		if(data[i].name===n){
			id=data[i].id;
			t2=data[i].usetime;
		}
	}
	var data2=await User.findById(id);
	if(t<t2){
		t2=t;
	}
	data2.usetime=t2;
	await data2.save();
	res.send(data2);

})

app.post('/api/zhuce',async (req,res)=>{
	var u=req.body.name;
	var data=await User.find();
	var flag=0;
	var tttt={}
	for(var i=0;i<data.length;i++){
		if(data[i].name===u){
			flag=1;
			tttt={
				"st":"unsuccess"
			}
		}
	}
	if(flag===0){
		var a=req.body;
		await User.create(a);
		tttt={
			"st":"success"
		}
	}
	res.send(tttt);
})

app.post('/api/new',async (req,res)=>{
	var na="ironman";
	var p="123456";
	var ttime=1000;
	var u=[{
		name:na,
		password:p,
		usetime:ttime,
	}]
	await User.create(u);
	var data=await User.find();
	var id;
	var t2;
	for(var i=0;i<data.length;i++){
		if(data[i].name===na){
			id=data[i].id;
			t2=data[i].usetime;
		}
	}
	var data2=await User.findById(id);
	data2.usetime=1000;
	await data2.save();
	res.send(data2);
})






















// app.get('/about',function(req,res){
// 	res.send([
// 		{
// 			user:'about us'
// 		}
// 	])
	
// })
// app.get('/products',async function(req,res){
// 	const data=await Product.find();
// 	res.send(data)
	
// })

// app.get('/products/:id',async function(req,res){
// 	const data=await Product.findById(req.params.id);
// 	res.send(data)
	
// })
// app.post('/products',async function(req,res){
// 	const data=req.body;
// 	const product=await Product.create(data)
// 	res.send(product)
// })

// app.put('/products/:id',async function(req,res){
// 	const product=await Product.findById(req.params.id);
// 	product.title=req.body.title;
// 	await product.save();
// 	res.send(product);
// })

// app.delete('/products/:id',async function(req,res){
// 	const product=await Product.findById(req.params.id)
// 	await product.remove();
// 	res.send({
// 		"heeeee":"lalalalal"
// 	})
// })
app.listen(4000,()=>{
	console.log('on 4000port！');
})
