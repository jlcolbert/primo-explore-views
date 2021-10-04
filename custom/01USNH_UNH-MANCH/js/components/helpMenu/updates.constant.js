const Updates = [
  {
    id: "visiting-the-libraries",
    title: "Remote Access",
    description:
      "discussion of covid-related changes to unh manchester libraries operation",
    icon: { code: "business", group: "communication" },
    template: `
      <h2>Remote Access</h2>
      <p>Our services, such as research help, are still available online. Ask a librarian for more help!.</p>
      <p><a href="https://libraryguides.unh.edu/remoteaccess">Visit our Remote Access Research Guide for more information about using library resources and services remotely.</a></p>
       `,
  },
  {},
  {
    id: "new-features",
    title: "What's New in the Library Search Box?",
    description: "information on newly added features",
    icon: { code: "extension", group: "action" },
    template: `
      <h2>Recently Added Features</h2>
      <h3>Available Online</h3>
      <p>Click the dropdown menu that says "Library Catalog & Articles" and select "Available Online" to limit your results to only things we have immediate online access to. Expand your results to include items you can get through Interlibrary Loan.</p>
      <h3>External Search</h3>
      <p>The External Search filter on the left side of the results allows you to repeat your search in WorldCat (Books & Media Worldwide) or Google Scholar.</p>
      <h3>Help Menu</h3>
      <p>This is what you're looking at right now! In the top right menu of the webpage, click the circular icon with the question mark to open this help menu. It contains a lot of information about searching for resources.</p>
      <h3>Author Information Card</h3>
      <p>At the bottom of some item records, a new section will be created titled "More information about the author". If certain parameters are met, this Author Information Card pulls information about the author from Wikidata, DBpedia, and more!</p>
      <h3>Newspaper Search</h3>
      <p>Newspaper articles will no longer be included in your results. Instead, you can use the dedicated Newspaper Search. You can get to this by doing a regular search and then clicking "Newspaper Search" in the Resource Type filter, or by scrolling to the bottom of your results and clicking the link there. There is also a link in the top menu of the results page.</p>
      </ul>
    `,
  },
];

export default Updates;
