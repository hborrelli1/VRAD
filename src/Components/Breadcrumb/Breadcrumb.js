import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Link } from "react-router-dom";

const Breadcrumb = props => {
  const routes = [
    {
      path: "/areas/",
      link: "/",
      linkText: "Home"
    },
    {
      path: "/areas/river-north/",
      link: "/areas/river-north",
      linkText: "River-North"
    },
    {
      path: "/areas/river-north/:id",
      link: "/areas/river-north",
      linkText: "River-North-Listing"
    },
    {
      path: "/areas/park-hill/",
      link: "/areas/park-hill",
      linkText: "Park-Hill!"
    },
    {
      path: "/areas/park-hill/:id",
      link: "/areas/park-hill",
      linkText: "Park-Hill-Listing!"
    },
    {
      path: "/areas/lower-highlands/",
      link: "/areas/lower-highlands",
      linkText: "Lower-Highlands!"
    },
    {
      path: "/areas/lower-highlands/:id",
      link: "/areas/lower-highlands",
      linkText: "Lower-Highlands-Listing!"
    },
    {
      path: "/areas/capitol-hill/",
      link: "/areas/capitol-hill",
      linkText: "Capitol-Hill!"
    },
    {
      path: "/areas/capitol-hill/:id",
      link: "/areas/capitol-hill",
      linkText: "Capitol-Hill-Listings!"
    }
  ];

  const routeConstruction = () => {
    let finalRoutes = routes.map(route => {
      return {
        routeHTML: (
          <Route path={route.path}>
            <li>
              <Link to={route.link}>{route.linkText}</Link>
            </li>
          </Route>
        ),
        endrouteHTML: (
          <Route path={route.path}>
            <li>
              {route.linkText}
            </li>
          </Route>
        )
      };
    });
    let lastIndex = props.path.split("/").length - 2;
    finalRoutes = finalRoutes.reduce((acc, child, index) => {
      const notLast = index < lastIndex;
      if (notLast) {
        acc.push(child.routeHTML, "/");
      } else {
        acc.push(child.endrouteHTML);
      }
      return acc;
    }, []);

    return finalRoutes;
  };

  return (
    <nav>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {routeConstruction()}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
