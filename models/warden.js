const connection=require('./mysql_connection.js');

const TableStructure=`
    CREATE TABLE IF NOT EXISTS WARDENS(
        wid int NOT NULL AUTO_INCREMENT,
        contact char(12),
        name char(40) NOT NULL,
        hid int NOT NULL,
        PRIMARY KEY(wid)
    )
`;

const createWarden=(wardenDetails,callback)=>
{
    const createWardenQuery=`
        INSERT INTO WARDENS(name,hid)
        VALUES(
            \"${wardenDetails.name}\",
            \"${wardenDetails.hid}\"
        )
    `;
    connection.query(createWardenQuery,)
};


const getWardenByHostelId = (hid,callback)=>{

    console.log("hostel id is " + hid);

    if(hid===undefined)
    {
        callback("Error: No Id provided")
        return;
    }
    const getUserByIdQuery=`SELECT * FROM WARDENS WHERE hid=\"${hid}\"`;
    connection.query(getUserByIdQuery,(err,result)=>
    {
        if(err)
        {
            callback(err);
            return;
        }
        if(result.length==0)
        {
            callback(err,undefined);
            return;
        }
        callback(err,result);        
    });
}


const createNewWarden = (wardenDetails,callback)=>{

    if(wardenDetails===undefined||wardenDetails.uid===undefined||wardenDetails.password===undefined||wardenDetails.hostel_id===undefined||wardenDetails.name===undefined)
    {
        callback("Error: Full details not provided");
        return;
    }

    getWardenById(wardenDetails.uid,(err,res)=>
    {
        if(err)
        {
            return callback(err,undefined);
        }
        if(res===undefined){
            wardenDetails.contact=wardenDetails.contact===undefined?`\"0\"`:wardenDetails.contact;
            const createUserQuery=`
            INSERT INTO WARDENS(wid,contact,name,hid,password) values(\
                "${wardenDetails.uid}\",
                \"${wardenDetails.contact}\",
                \"${wardenDetails.name}\",
                ${wardenDetails.hostel_id},
                \"${wardenDetails.password}\"
                
            )`;

            //INSERTING INTO USERS

            const createUserQueryuser=`
            INSERT INTO USERS(uid,password,is_admin,hostel_id,name,contact,facebook,twitter) values(\
                "${wardenDetails.uid}\",
                \"${wardenDetails.password}\",
                0,
                ${wardenDetails.hostel_id},
                \"${wardenDetails.name}\",
                \"${wardenDetails.contact}\",
                "",
                ""
            )`;
            connection.query(createUserQueryuser,(err,res)=>
            {
                if(err)
                {
                    console.log("error into adding warden into users table");
                }else
                {
                     console.log("sucessfully added");
                }
            });



            connection.query(createUserQuery,(err,res)=>
            {
                if(err)
                {
                    console.log("error in adding warden");
                    return callback(err,false);
                }else
                {
                    return callback(undefined,true);
                }
            });
        }else{
            return callback("User with given uid already exists.",undefined);
        }
    });
}


const getWardenById=(wid,callback)=>
{
    if(wid===undefined)
    {
        callback("Error: No Id provided")
        return;
    }
    const getUserByIdQuery=`SELECT * FROM WARDENS WHERE Wid=\"${wid}\"`;
    connection.query(getUserByIdQuery,(err,result)=>
    {
        if(err)
        {
            callback(err);
            return;
        }
        if(result.length==0)
        {
            callback(err,undefined);
            return;
        }
        result=result[0];
        callback(err,result);        
    });
};


module.exports = {
    getWardenByHostelId,
    createNewWarden
}