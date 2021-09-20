const Updates = [
  {
    id: "visiting-the-libraries",
    title: "Visiting the Libraries: COVID-19",
    description:
      "discussion of covid-related changes to bu libraries operation",
    icon: { code: "business", group: "communication" },
    template: `
      <h2>COVID-19 Updates</h2>
      <p>For the most up-to-date information about visiting the library, please check <a href="https://library.unh.edu/blog/2021/covid-19">our COVID-19 page</a>.
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
      <h3>Information Below Search Box</h3>
      <p>The menu below the search box contains links to important information and resources, such as links to the other campus search boxes, library locations, and a tutorial research guide.</p>
      <h3>Help Menu</h3>
      <p>This is what you're looking at right now! In the top right menu of the webpage, click the circular icon with the question mark to open this help menu. It contains a lot of information about searching for resources.</p>
      <h3>Newspaper Search</h3>
      <p>Newspaper articles will no longer be included in your results. Instead, you can use the dedicated Newspaper Search. You can get to this by doing a regular search and then clicking "Newspaper Search" in the Resource Type filter, or by scrolling to the bottom of your results and clicking the link there. There is also a link in the top menu of the results page.</p>
      <h3>Unpaywall</h3>
      <p>The Library Search Box already indicates if an article is Open Access (meaning it can be accessed without paying for it, even if you're not in your library account). However, it doesn't always give you a link to the Open Access version. With this new feature, a link that says "View Open Access Version via Unpaywall" will show up in your results. Clicking this link will download directly or take you to the article, for free! (It sometimes even finds Open Access versions when the Library Search Box can't, including on items we don't have access to.)</p>
      </ul>
    `,
  },
];

export default Updates;
