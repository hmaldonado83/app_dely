const User = require('../models/user');
const bcrypt = require('bcryptjs');
const profile = require('../models/profile');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {
    
    verifyToken(req, res){
        const arrayToken = req.params.token.split('.');
        
        try {
           // const token = JSON.parse(atob(arrayToken[1]));
            var token = req.params.token.replace('JWT ','');
            jwt.verify(token, keys.secretOrKey, function(err, decoded){
              if(!err){
                    //var secrets = decoded;
                    const email = decoded.email;
                    const password = decoded.password;

                    User.findByEmail(email, async (err, myUser) => {
                        
                        //https://auth0.com/es/learn/token-based-authentication-made-easy

                        if (err) {
                            return res.status(501).json({
                                success: false,
                                message: 'Hubo un error con el registro del usuario',
                                error: err
                            });
                        }

                        if (!myUser) {
                            return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                                success: false,
                                message: 'Usuario o contraseña invalida'
                            });
                        }

                    //  const isPasswordValid = await bcrypt.compare(password, myUser.password);
                    // console.log('Estee es el problema ' , isPasswordValid);

                        if (password == myUser.password) {
                        // const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});
                        const token = jwt.sign({
                                id: `${myUser.id}` ,
                                name: myUser.name,
                                tcli: myUser.tcli,
                                identification: myUser.identification,
                                email: myUser.email,
                                operator: myUser.operator,
                                phone: myUser.phone,
                                city: myUser.city,
                                image: myUser.image,
                                password: myUser.password,
                                profile: JSON.parse(myUser.profile)

                        }, keys.secretOrKey, {});
                        console.log(token);
                            const data = {
                                id: `${myUser.id}` ,
                                name: myUser.name,
                                tcli: myUser.tcli,
                                identification: myUser.identification,
                                email: myUser.email,
                                operator: myUser.operator,
                                phone: myUser.phone,
                                city: myUser.city,
                                image: myUser.image,
                                password: myUser.password,
                                sessionToken: `JWT ${token}`,
                                profile: JSON.parse(myUser.profile)
                            }
                        

                            return res.status(201).json(data);

                        }
                        else {
                            return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                                success: false,
                                message: 'El password es incorrecto'
                            });
                        }

                    });
                //res.json(secrets);
              } else {
                //res.send(err);
                return res.status(401).json(err);
              }
            })
        

            
        } catch (error) {
            if (error) {
                return res.status(401).json({
                    success: false,
                    message: 'Hubo un con el token',
                    error: error
                });
            }
        }
       /* const data = {
            id: myUser.id ,
            name: myUser.name,
            tcli: myUser.tcli,
            identification: myUser.identification,
            email: myUser.email,
            operator: myUser.operator,
            phone: myUser.phone,
            city: myUser.city,
            image: myUser.image,
            password: myUser.password,
            sessionToken: req.params.token,
            profile: myUser.profile
        }
      

       
        console.log(data);
        return res.status(201).json(data);*/

        
    },
    login(req, res) {

        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {
            
           

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'Usuario o contraseña invalida'
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);
            console.log('Estee es el problema ' , isPasswordValid);

            if (isPasswordValid) {
               // const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});
               const token = jwt.sign({
                    id: `${myUser.id}` ,
                    name: myUser.name,
                    tcli: myUser.tcli,
                    identification: myUser.identification,
                    email: myUser.email,
                    operator: myUser.operator,
                    phone: myUser.phone,
                    city: myUser.city,
                    image: myUser.image,
                    password: myUser.password,
                    profile: JSON.parse(myUser.profile)

               }, keys.secretOrKey, {});
               console.log(token);
                const data = {
                    id: `${myUser.id}` ,
                    name: myUser.name,
                    tcli: myUser.tcli,
                    identification: myUser.identification,
                    email: myUser.email,
                    operator: myUser.operator,
                    phone: myUser.phone,
                    city: myUser.city,
                    image: myUser.image,
                    password: myUser.password,
                    sessionToken: `JWT ${token}`,
                    profile: JSON.parse(myUser.profile)
                }
              

                console.log(data);
                
              
               
               

               /* return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });*/
                return res.status(201).json(data);

            }
            else {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El password es incorrecto'
                });
            }

        });

    },

    register(req, res) {

        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        User.create(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
            
            user.id =`${data}` ;
            const token = jwt.sign({id: user.id, email: user.email}, keys.secretOrKey, {});
            user.session_token = `JWT ${token}`;
            user.profile = [{"id": "3", "name": "CLIENTE", "image": null, "route": "/client/products/list"}];

            profile.create(user.id, 3, (err, data) =>{
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del rol del usuario',
                        error: err
                    });
                }
                console.log('Esto es lo que se crea al registrar el usuario' , user);
                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizo correctamente',
                    data: user // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });
            });
            

        });

    }

}