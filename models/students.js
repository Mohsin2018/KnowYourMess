const connection=require('./mysql_connection.js');

const TableStructure=`
CREATE TABLE IF NOT EXISTS STUDENTS(
    registration_no varchar(15) primary key,
    name varchar(100) NOT NULL,
    password varchar(50),
    contact_no varchar(12)
    
)
`;

const  addStudents= (studentdetails,callback)=>{

      if(studentdetails == undefined)
      {
        callback("invalid parameters!");
        return;
      }
    const createStudentQuery=`
        INSERT INTO STUDENTS(registration_no,name,password,contact_no) 
        VALUES(\"${studentdetails.registration_no}\", \"${studentdetails.name}\",\"${studentdetails.password}\",\"${studentdetails.contact_no}\");
    `;

    connection.query(createStudentQuery,(err,res)=>
    {
        if(err)
        {
            return callback(err,false);
        }else
            return callback(undefined,true);
    });

}
module.exports={
    addStudents
   
}