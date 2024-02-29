import React from 'react'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (
    <>
    <div className="py-5 my-5 text-center">
      <h1>404</h1>
      <h2>page not found</h2>
      <Link to={"/"}>
      <button className="btn btn-outline-dark">Go to Home Page</button>
        </Link>
    </div>
    </>
  )
}
