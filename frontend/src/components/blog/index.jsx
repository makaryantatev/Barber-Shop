import '../../assets/css/blog.css';
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Blog() {
  const [data, setData] = useState([]);
  const [cate, setCat] = useState('all');
  const [search, setSearch] = useState('')

  const getData = async () => {
    try {
      const req = await fetch('https://barber-shop-pearl-sigma.vercel.app/getblog');
      const res = await req.json()
      setData(res)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const uniqueCategories = [...new Set(data.map(item => item.category))]
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  const filteredBlogs =
    data
      .filter(item => cate === 'all' ? true : item.category === cate)
      .filter(item => {
        const regex = new RegExp(search, "i")
        return regex.test(item.title) || regex.test(item.answer)
      })

  const groupedBlogs = filteredBlogs.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})


  return (
    <>
      <section className='blogsec'>
        <div className="fDiv">
          <p>Our Blog</p>
          <h1>Style & Grooming</h1>
          <p>Tips, trends, and grooming advice from our barbers.</p>
          <p>
            <span><Link to={'/'}>Home</Link> /</span> Blog
          </p>
        </div>

        <div className='blogg'>
          <div className='searchDiv'>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search articles...'
            />
            <span className='searchSpan'><IoIosSearch /></span>
          </div>

          <div className="category-buttons">
            <button
              className={cate === 'all' ? 'active' : ''}
              onClick={() => setCat('all')}
            >
              All
            </button>

            {uniqueCategories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setCat(cat)}
                className={cate === cat ? 'active' : ''}
              >
                {capitalize(cat)}
              </button>
            ))}
          </div>

          <div className='blog'>

            {cate === 'all' ? (
              <div className="category-grid">
                {data
                  .filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()))
                  .map((blog) => (
                    <Link to={`/blog/${blog._id}`} className='blogDiv' key={blog._id}>
                      <div className='imgBlog'>
                        <img src={blog.img} alt="" />
                      </div>

                      <div className='textBlog'>
                        <h2 className="service-category">{capitalize(blog.category)}</h2>
                        <h1>{blog.title}</h1>
                        <p className="answer">{blog.answer}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            ) : (
              Object.keys(groupedBlogs).map((cat) => (
                <div key={cat} className="category-block">


                  <div className="category-grid">
                    {groupedBlogs[cat].map((blog) => (
                      <Link to={`/blog/${blog._id}`} className='blogDiv' key={blog._id}>
                        <div className='imgBlog'>
                          <img src={blog.img} alt="" />
                        </div>

                        <div className='textBlog'>
                          <h2 className="service-category">{capitalize(cat)}</h2>
                          <h1>{blog.title}</h1>
                          <p className="answer">{blog.answer}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                </div>
              ))
            )}

          </div>

        </div>
      </section>
    </>
  )
}
{/* <div className="blog">
                        {data.map((blog, index) => (
                            <div key={index} className='blogDiv'>
                                <h1>{blog.title}</h1>
                                <p className="answer">{blog.answer}</p>

                                <img src={blog.img} alt="" />

                                <p>{blog.text1}</p>

                                {blog.paragraphs.map((p, i) => (
                                    <div key={i} className="paragraph">
                                        <h2>{p.t}</h2>

                                        {p.content.map((text, idx) => (
                                            <p key={idx}>{text}</p>
                                        ))}

                                        {p.list.length > 0 && (
                                            <ul>
                                                {p.list.map((item, idx) => (
                                                    <li key={idx}>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div> */}