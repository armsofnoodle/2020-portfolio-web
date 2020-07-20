import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import footerStyles from "../styles/footer.module.scss"
import Instagram from "../images/instagram.svg"
import LinkedIn from "../images/linkedin.svg"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      sanitySocials(title: { eq: "Giovanni Gambassi" }) {
        title
        instagram
        linkedIn
      }
    }
  `)
  return (
    <footer className={footerStyles.footer}>
      <div>{`© ${new Date().getFullYear()}, ${data.sanitySocials.title}`}</div>
      <a href={data.sanitySocials.instagram} target='_blank' rel='noreferrer'>
        <Instagram />
      </a>
      <a href={data.sanitySocials.linkedIn} target='_blank' rel='noreferrer'>
        <LinkedIn />
      </a>
    </footer>
  )
}

export default Footer
