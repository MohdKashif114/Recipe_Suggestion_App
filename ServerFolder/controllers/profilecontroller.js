




const profilecontroller=async(req,res)=>{
    console.log("entered profile controller")
    res.status(200).json({success:true,message:"Welcome to your profile hahah"})
}

export default profilecontroller;