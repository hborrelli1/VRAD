import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Link } from "react-router-dom";

const Breadcrumb = props => {
  const routes = [
    {
      path: "/areas/",
      link:'/',
      linkText:'Home'
    },
    {
      path: "/areas/river-north/:id",
      link:'/areas/river-north',
      linkText:'Rino'
    },
    {
      path: "/areas/park-hill/:id",
      link:'/areas/park-hill',
      linkText:'Park-Hill!'
    },
    {
      path: "/areas/lower-highlands/:id",
      link:'/areas/lower-highlands',
      linkText:'Lower-Highlands!'
    },
    {
      path: "/areas/capitol-hill/:id",
      link:'/areas/capitol-hill',
      linkText:'Capitol-Hill!'
    },

  ];

  const routeConstruction = () => {
    let finalRoutes = routes.map(route=>{
      return (
        <Route path={route.path}>
          <li>
            <Link to={route.link}>{route.linkText}</Link>
          </li>
        </Route>
      )
    })
    let lastIndex = props.path.split('/').length -2;
    finalRoutes = finalRoutes.reduce((acc,child,index) => {
      const notLast = index< lastIndex;
      if (notLast) {
        acc.push(child,'/')
      } else {
        acc.push(child)
      }
      return acc;
    },[])

    return finalRoutes;
  }

  return (
    <nav>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {routeConstruction()}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
