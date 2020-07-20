import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import BlockContent from "@sanity/block-content-to-react"
import getVideoId from "get-video-id"
import Image from "../components/image"
import Layout from "../components/layout"
import Arrow from "../images/down-arrow.svg"

import projectStyles from "../styles/project.module.scss"

export const query = graphql`
  query($slug: String) {
    sanityProject(slug: { current: { eq: $slug } }) {
      title
      slug {
        current
      }
      year
      tags {
        tag
      }
      excerpt
      links {
        title
        url
      }
      heroImage {
        image {
          asset {
            _id
            fluid(maxWidth: 5000) {
              ...GatsbySanityImageFluid
            }
          }
        }
        caption
      }
      supportingImages {
        image {
          asset {
            _id
            fluid(maxWidth: 5000) {
              ...GatsbySanityImageFluid
            }
          }
        }
        caption
      }
      video {
        url
      }
      collaborators {
        name
        link
      }
      description {
        _type
        children {
          _type
          marks
          text
        }
      }
    }
  }
`

const VideoPreview = value => {
  if (value.url) {
    const video = getVideoId(value.url)
    return (
      <iframe
        className={projectStyles.video}
        key={video.id}
        title="Project Video"
        src={`${
          video.service === "youtube"
            ? "https://www.youtube.com/embed/"
            : "https://player.vimeo.com/video/"
        }${video.id}`}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="fullscreen"
      ></iframe>
    )
  } else {
    return <div>Missing URL</div>
  }
}

export default ({ data }) => {
  return (
    <Layout>
      <SEO title={data.sanityProject.title} />
      <Link to="/work" className={projectStyles.back}>
        <Arrow className={projectStyles.arrow} />
        Back
      </Link>
      <h1 className={projectStyles.title}>{data.sanityProject.title}</h1>
      <p className={projectStyles.subtitle}>
      {data.sanityProject.year && `${data.sanityProject.year} | `}
        {data.sanityProject.tags.map(({ tag }, index) => {
          if (index !== data.sanityProject.tags.length - 1) {
            return `${tag}, `
          } else {
            return `${tag}`
          }
        })}
      </p>
      <div className={projectStyles.contentBlock}>
        <div className={projectStyles.content}>
          <p>{data.sanityProject.excerpt}</p>
          <BlockContent blocks={data.sanityProject.description} />
        </div>
        <div className={projectStyles.content}>
          {data.sanityProject.collaborators.length > 0 && (
            <div>
              <h4>Collaborators</h4>
              <ul>
                {data.sanityProject.collaborators.map(collaborator => {
                  return (
                    <li key={collaborator.name}>
                      <a
                        href={collaborator.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {collaborator.name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {data.sanityProject.links.length > 0 && (
            <div>
              <h4>Project Links</h4>
              <ul>
                {data.sanityProject.links.map(link => {
                  return (
                    <li key={link.title}>
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      {data.sanityProject.video.length > 0 && (
        <div className={projectStyles.videoContainer}>
          {data.sanityProject.video.map(clip => {
            return VideoPreview(clip)
          })}
        </div>
      )}
      <div className={projectStyles.imagesBlock}>
        <Image
          fluid={data.sanityProject.heroImage.image.asset.fluid}
          className={projectStyles.image}
        />
        {data.sanityProject.supportingImages.map(({ image }) => {
          return (
            <Image
              key={image.asset._id}
              fluid={image.asset.fluid}
              className={projectStyles.image}
            />
          )
        })}
      </div>
      <Link to="/work" className={projectStyles.back}>
        <Arrow className={projectStyles.arrow} />
        Back
      </Link>
    </Layout>
  )
}
