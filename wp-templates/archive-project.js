import { gql } from '@apollo/client';
import Link from 'next/link';
import { useEffect } from 'react';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  EntryHeader,
  NavigationMenu,
  Post,
  FeaturedImage,
  SEO,
} from '../components';
import { GlobalFields } from '../components/GlobalFields';


export default function ArchiveProject(props) {

  const { label, contentNodes } = props.data.nodeByUri;
  const { title: siteTitle, description: siteDescription } = props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { name, posts } = props.data.nodeByUri 

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <GlobalFields />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <>
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h1>{label} Archive</h1>

                <ul>
                  {contentNodes.nodes.map((node) => (
                    <li>
                      <Link href={node.uri}>{node.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

ArchiveProject.variables = ({ uri }) => {
  return { 
    uri,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};

ArchiveProject.query = gql`
  ${BlogInfoFragment} 
  ${NavigationMenu.fragments.entry} 
  query ProjectArchive(
    $uri: String! 
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    ) {
    nodeByUri(uri: $uri) {
      ... on ContentType {
        label
        description
        contentNodes {
          nodes {
            databaseId
            uri
            ... on NodeWithTitle {
              title
            }
          }
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;