//Snippet model

const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const snippetSchema=new Schema({
    uid:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    about:{
        type:String
    },
    category:{
        type:String,
        default:"General"
    },
    tags:{
        type:[String],
        default:[]
    },
    code:{
        type:String,
    },
    followup:{
        type:String,
        default:""
    },
    date:{
        type:Date,
        default:Date.now
    }

});
const Snippets=mongoose.model('Snippets',snippetSchema);
module.exports=Snippets;