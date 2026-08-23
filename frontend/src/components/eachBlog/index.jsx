import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../assets/css/eachBlog.css';
import { IoIosArrowRoundBack } from "react-icons/io";


export default function SingleBlog() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    const getData = async () => {
        try {
            const req = await fetch(`https://barber-shop-api.vercel.app/getblog/${id}`);
            const res = await req.json()
            setData(res)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    if (!data) return <p>Loading...</p>;

    return (
        <div className="blog">
            <div className="eachBlogdiv">
                <p className="backToBlog">
                    <Link to={'/blog'}>
                        <span className="ik"><IoIosArrowRoundBack/></span>
                        <span>Back to Blog</span>
                    </Link>
                </p>
                <p className="paths"> 
                    <span>
                        <Link to={'/'}>Home /</Link>
                    </span>
                    <span>
                        <Link to={'/blog'}>Blog /</Link>
                    </span>
                    <span>
                        Article
                    </span>
                </p>
                <p className="categ">{data.category}</p>
                <h1 className="mecP">{data.title}</h1>
                <p className="pujurP">{data.answer}</p>
                <hr/>  
            </div>

            <div className="eachBlogImg">
                <img src={data.img} alt="" />
            </div>

            <div className="eachBlogdiv">
                <p className="pujurP">{data.text1}</p>
            </div>

            <div className="eachBlogdiv">
                {data.paragraphs.map((p, i) => (
                    <div key={i}>
                        <h2 className="mecP">{p.t}</h2>

                        {p.content.map((text, idx) => (
                            <p className="pujurP" key={idx}>{text}</p>
                        ))}

                        {p.list.length > 0 && ( 
                            <ul className="blog-ul">
                                {p.list.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}