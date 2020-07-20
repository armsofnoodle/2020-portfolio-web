import { Link } from "gatsby"
// import PropTypes from "prop-types"
import React, { useState } from "react"
import headerStyles from "../styles/header.module.scss"

const Header = () => {
  const [open, setOpen] = useState(false)

  const menuClicked = () => {
    setOpen(!open)
  }

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.burger} onClick={menuClicked}>
        <div className={open ? `${headerStyles.burgerTop} ${headerStyles.burgerTopOpen}` : `${headerStyles.burgerTop} ${headerStyles.burgerTopClosed}`} />
        <div className={open ? `${headerStyles.burgerBottom} ${headerStyles.burgerBottomOpen}` : `${headerStyles.burgerBottom} ${headerStyles.burgerBottomClosed}`} />
      </div>
      <div className={open ? `${headerStyles.menu} ${headerStyles.menuOpen}` : `${headerStyles.menu} ${headerStyles.menuClosed}`}>
        
      <ul className={headerStyles.list}>
          <li>
            <Link to="/" onClick={menuClicked}>Me</Link>
          </li>
          <li>
            <Link to="/work" onClick={menuClicked}>Work</Link>
          </li>
        </ul>
        
      </div>
    </header>
  )
}

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header
