import React from "react"
import { Link, graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import homeStyles from "../styles/home.module.scss"
import Email from "../images/email.svg"
import Resume from "../images/resume.svg"
import Arrow from "../images/down-arrow.svg"

export const query = graphql`
  query {
    sanityPage(title: { eq: "Home" }) {
      title
      email
      cv {
        asset {
          url
        }
      }
      content {
        _key
        _type
        children {
          _key
          _type
          marks
          text
        }
      }
    }
  }
`

const HomePage = ({ data }) => {
  const scrollDown = () => {
    window.scrollTo(0, window.innerHeight)
  }

  return (
    <Layout>
      <SEO title="Me" />
      <div className={homeStyles.titleFlex}>
        <div className={homeStyles.titleBlock}>
          <h1 className={homeStyles.title}>
            Hi, my name is
            <br />
            <span>Giovanni Gambassi.</span>
          </h1>
        </div>
        <div className={homeStyles.titleRight}>
          <div className={homeStyles.svgContainer}>
            <a
              href={`mailto:${data.sanityPage.email}`}
              target="_blank"
              rel="noreferrer"
            >
              <Email className={homeStyles.email} />
            </a>
            <a
              href={`${data.sanityPage.cv.asset.url}`}
              target="_blank"
              rel="noreferrer"
            >
            <Resume className={homeStyles.resume} />
            </a>
          </div>
          <Arrow className={homeStyles.arrow} onClick={scrollDown} />
        </div>
      </div>
      <div className={homeStyles.contentBlock}>
        <BlockContent
          blocks={data.sanityPage.content}
          className={homeStyles.content}
        />
        <p className={homeStyles.content}>
          Check out my <Link to="/work">work.</Link>
        </p>
      </div>
    </Layout>
  )
}

export default HomePage
