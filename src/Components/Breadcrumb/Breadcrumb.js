import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Breadcrumb = props => {
  const routeConstruction = () => {
    let breadCrumbs = props.path.split("/");
    breadCrumbs.shift();
    breadCrumbs = breadCrumbs.reduce(
      (crumbs, curVal, index) => {
        if (index === 0) {
          crumbs.paths.push({
            path: curVal,
            link: "/areas",
            linkText: curVal
          });
        } else if(curVal === 'favorites'){
          crumbs.paths=[{
            path: 'favorites',
            link: `/${curVal}`,
            linkText: curVal
          }]
        } else {
          let newPath = crumbs.prevPath + "/" + curVal;
          crumbs.paths.push({
            path: newPath,
            link: `/areas/${curVal}`,
            linkText: curVal
          });
        }
        let tempIndex = crumbs.paths.length-1;
        crumbs.prevPath = crumbs.paths[tempIndex].path;
        return crumbs;
      },
      { prevPath: "", paths: [] }
    );

    let breadCrumbsLinks = breadCrumbs.paths.map(route => {
      return {
        routeHTML: (
          <li>
            <Link key ={route.link} to={route.link}>{route.linkText}</Link>
          </li>
        ),
        endrouteHTML: <li key= "s">{route.linkText}</li>
      };
    });

    let lastIndex = breadCrumbs.paths.length - 1;
    return breadCrumbsLinks.reduce((breadCrumbStyle, child, index) => {
      const notLast = index < lastIndex;
      if (notLast) {
        breadCrumbStyle.push(child.routeHTML, "/");
      } else {
        breadCrumbStyle.push(child.endrouteHTML);
      }
      return breadCrumbStyle;
    }, []);

  };

  return (
    <nav>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {routeConstruction()}
      </ul>
    </nav>
  );
};

Breadcrumb.propTypes = {
  path:PropTypes.string,
  location: PropTypes.object
}

export default Breadcrumb;
