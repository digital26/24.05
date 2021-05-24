import React, {useState, useEffect} from "react"
import AdminNav from "../../../components/nav/AdminNav"
import {toast} from "react-toastify"
import {useSelector} from "react-redux"
import {getCategories} from "../../../functions/category"
import {createSub,
       getSub, getSubs,
        removeSub} from "../../../functions/sub"
import {Link} from "react-router-dom";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import CategoryForm from "../../../components/forms/CaregoryForm"
import LocalSearch from "../../../components/forms/LocalSearch"

const SubCreate = () => {
    const {user} = useSelector(state => ({...state}))
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [subs,setSubs] = useState([])
    const [categories,setCategories] = useState([])
    const [category, setCategory] = useState("")
    

     //step 1
     const [keyword, setKeyword] = useState("")

    useEffect(() =>{
            loadCategories()
            loadSubs()
    }, [])

    const loadCategories = () =>
         getCategories()
        .then((c) => {
        setCategories(c.data)
        })

        const loadSubs = () =>
        getSubs()
        .then((c) => {
        setSubs(c.data)
        })

    const handleSubmit= (e) => {
        e.preventDefault()
       // console.log(name)
        setLoading(true)
        createSub({name, parent: category,}, user.token)
        .then((res) => {
            setLoading(false)
            setName("")
            toast.success(`"${res.data.name}" is created`)
            loadSubs()
        })
        .catch(err => {
            console.log(err)
            setLoading(false) 
            if (err.response.status === 400) {
                 toast.error(err.response.data)
}  
      })
    }

    const handleRemove = async (slug) => {
       /* let answer = window.confirm("Delete?")
        console.log(answer, slug)*/
        if(window.confirm("Delete?")){
            setLoading(true)
            removeSub(slug, user.token)
            .then((res) => {
                    setLoading(false)
                    toast.error(`${res.data.name} deleted`)
                    loadSubs()
            })
            .catch((err) => {
                if(err.response.status === 400) {
                    toast.error(err.response.data)
                }
                setLoading(false)
                loadSubs()
            })
        }
    }
 
    const searched= (keyword) => (c) => c
        .name
        .toLowerCase()
        .includes(keyword)

    
    return (
        <div className="container-fluid">
             <div className="row">
                <div className="col-md-2">
                     <AdminNav />
                </div>
        <div className="col">
             {loading ?( <h4  
             className="text-success">Loading..</h4>
             ) : (
            <h4>Create sub categories</h4>)}
           
               


                 <div className="form-group">
                     <label>ParentCategory</label>
                     <select 
                        name="category"
                        className="form-control" 
                        onChange={(e) => setCategory(e.target.value)}>

                        <option>Pleace Select</option>
                        {categories.length > 0 && categories.map((c) =>
                        (<option key={c._id} value={c._id}>
                        {c.name}
                        </option>
                        ))}
                     </select>
                 </div>

              

                 <CategoryForm 
                     handleSubmit={handleSubmit}
                     name={name}
                     setName={setName}
                 />

                  <LocalSearch 
                    keyword={keyword}
                    setKeyword= {setKeyword}
                 />

                     <hr/>
              
               
      {subs.filter(searched(keyword)).map((s) => (
                <div className="alert alert-info" key={s._id}>{s.name}
                 <span  
                    onClick={() => handleRemove(s.slug)} 
                    className="btn btn-sm float-right"
                    >
                    <DeleteOutlined className="text-danger" />
                    </span>{" "} 

                    <Link className="btn btn-sm float-right" 
                    to={`/admin/sub/${s.slug}`}> 
                    <EditOutlined className="text-success" />
                
                    </Link>

                </div>))}
            </div>
        </div>
    </div>
    )
}

export default SubCreate;