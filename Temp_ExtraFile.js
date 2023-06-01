export async function registerUser(credentials) {
  return new Promise(
    async function( resolve , reject) {
      
      await axios.post("/api/register", credentials)
        .then( response => {
            let { username, email } = credentials;

              /***send Email ***/
              // if (data.status === 201) {
              //   await axios.post("/api/registerMail", {
              //     username,
              //     userEmail: email,
              //     text: data.message,
              //   });
              // }
              return resolve(response)
        })
        .catch( error =>{
            return reject(error)
        })
    }
  )
  
}



 const [file, setFile] = useState()
    const formik = useFormik({
        initialValues: {
            email: '1@gmail.com',
            username: '1',
            password: '1222@'
        },
        validate: registerFormValiadate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            values = await Object.assign(values, { profile: file || '' })
            
            await registerUser(values)
            .then( response => {
                toast.promise(response, {
                    loading: 'Creating...',
                    success : <b> Register Successfully...!</b>,
                    error : <b>Could not Register.</b>
                });
            })
            .catch( error =>{
                toast.error(error.message)
            })
            
            
        }

    })
