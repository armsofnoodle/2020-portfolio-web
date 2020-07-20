import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import notFoundStyles from "../styles/notFound.module.scss"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className={notFoundStyles.notFound}>
      <h1>Whoops, you weren't meant to see this.</h1>
      <p>
        Maybe it's best if we went <Link to="/">home.</Link>
      </p>
    </div>
  </Layout>
)

export default NotFoundPage
