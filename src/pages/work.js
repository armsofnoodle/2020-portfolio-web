import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import workStyles from "../styles/work.module.scss"

export const query = graphql`
  query {
    allSanityProject(sort: {order:  [ASC, DESC], fields: [viewBottom, year]}) {
      edges {
        node {
          title
          slug {
            current
          }
          year
          viewBottom
          tags {
            tag
          }
          excerpt
          heroImage {
            image {
              asset {
                fluid(maxWidth: 5000) {
                  ...GatsbySanityImageFluid
                }
              }
            }
            caption
          }
        }
      }
    }
  }
`

const WorkPage = ({ data }) => (
  <Layout>
    <SEO title="Work" />
    <h1 className={workStyles.title}>Work</h1>
    <p className={workStyles.pageSubtitle}>A collection of my favourite projects I have been a part of.</p>
    <ul className={workStyles.list}>
      {data.allSanityProject.edges.map(({ node: project }, index) => {
        return (
          <li key={project.slug.current} style={{zIndex: data.allSanityProject.edges.length - index}}>
            <Link to={`/projects/${project.slug.current}`}>
              <Image
                className={workStyles.image}
                fluid={project.heroImage.image.asset.fluid}
                alt={project.heroImage.caption}
              />
              <div className={workStyles.projectDescription}>
                <h2>{project.title}</h2>
                <p className={workStyles.subtitle}>
                  {project.year && `${project.year} | `}
                  {project.tags.map(({ tag }, index) => {
                    if (index !== project.tags.length - 1) {
                      return `${tag}, `
                    } else {
                      return `${tag}`
                    }
                  })}
                </p>
                <p>{project.excerpt}</p>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  </Layout>
)

export default WorkPage
