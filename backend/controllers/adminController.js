const { Result } = require('express-validator')
const Epin = require('../models/epinModel')
const Client = require('../models/clientModel')


exports.totalGeneratedEpins = async(req,res) =>{
 try {
  const totalEpins = await Epin.find()
  if(!totalEpins) {
   return res.status(400).json({
    success:false,
    msg:"Epins not found"
   })
  }
  return res.status(200).json({
   success:true,
   count:totalEpins.length,
   totalEpins,
  })
 } catch (error) {
  return res.status(500).json({
   success:false,
   msg:"Error occured while getting epins"
  })
 }
}

exports.totalUsers = async(req,res) =>{
 try {
  const users = await Client.find().select("name level epin sponsorId number email")
  if(!users) {
   return res.status(400).json({
    success:false,
    msg:"Users not found"
   })
  } 
  return res.status(200).json({
   success:true,
   count:users.length,
   users,
  })
 } catch (error) {
  return res.status(500).json({
   success:false,
   msg:"Error occured while getting users"
  })
 }
}

