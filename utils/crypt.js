
const bcrypt=require('bcrypt')


const hashpassword=(plainPassword)=>{
  return bcrypt.hashSync(plainPassword,10)
}
const comparePassword=(plainPassword,hashedpassword)=>{
  return bcrypt.compareSync(plainPassword,hashedpassword)
}

module.exports={
  hashpassword,
  comparePassword
}