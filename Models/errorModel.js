function errorModel(text) {
  return ([
    {
      oboolean:false,
      omessage:text
    }
  ])
}

function successModel(){
  return([

    {
      oboolean:true,
      omessage:''
    }
  ])

}

module.exports={
  errorModel,
  successModel
}