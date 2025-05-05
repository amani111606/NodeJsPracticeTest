const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

mangoose.connect('mongodb+srv://amanib111606:AmaniB111606@cluster0.ebtawyf.mongodb.net/MongoDb')
.then(()=>{
    console.log('connected to database successfully');
})
.catch((e)=>{
    console.log('Error->',e);
})


const userSchema = new mangoose.Schema({
    name: String,
    email: String,
    age: String,
    isActive: Boolean,
    tags: [String],
    createdAt: {type: Date, default: Date.now}
})

const User = mongoose.model('User',userSchema);

async function CreateQueryCall() {
    try{
        //create new document
        const newUser = await User.create({
            name: 'update user',
            email: 'updateuser@gmail.com',
            age: '26',
            isActive: true,
            tags: ['','integrator'],
        })

        console.log('user created -->',newUser)
    }
    catch(e) {
        console.log('Error ->',e);
    }
    finally {
        //mongoose.connection.close();
        console.log('close');
    }
}
async function OtherQueries() {
    try{
        const allUsers = await User.find();
        console.log(allUsers,'All Users');

        const singleUserusingname = await User.find({name:'Amani'});
        console.log(singleUserusingname,'All Users');

        const activeUsers = await User.find({isActive:false});
        console.log(activeUsers,'activeUsers Users');

        const findone = await User.findOne({name:'Amani'});
        console.log(findone,'findone Users');

        const selectedfields = await User.find().select('name email');
        console.log('selected -->',selectedfields);

        const selectedfieldsId = await User.find({name:'Amani'}).select('_id');
        console.log(selectedfieldsId,'selected -->',selectedfieldsId[0]._id);
        
        const countDocs = await User.find({isActive:true}).countDocuments();
        console.log(countDocs,'count');

        const limiteduser = await User.find().limit(5).skip(2);
        console.log(limiteduser,'limited ');

        const sorted = await User.find().select('name age').sort({age: -1})
        console.log(sorted,'sorted ');

        const del = await User.findOneAndDelete({email: 'deleteuser@gmail.com'})
        console.log(del,'del');


        const update = await User.findOneAndUpdate({email: 'updateuser@gmail.com'},{
            $set: {age:120}, $push: {tags: 'updated'}
        },{new: true});
        console.log(update,'update');

        
    }
    catch(e) {
        console.log('Error ->',e);
    }
    finally {
        mongoose.connection.close();
        console.log('close');
    }
}

//CreateQueryCall();
OtherQueries();