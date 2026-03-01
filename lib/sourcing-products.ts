export type SourcingProduct = {
  id: number;
  title: string;
  price: { original: string; sale: string };
  url: string;
  images: string[];
  tag: string;
};

export type ExistingHarnessProduct = {
  id: string;
  title: string;
  price: string;
  handle: string;
  images: string[];
  tag: string;
  onSale?: boolean;
};

export const sourcingProducts: SourcingProduct[] = [
  {
    id: 1,
    title: "Elegant Rose Sheer Backless Bodysuit",
    price: { original: "€19.36", sale: "€5.33" },
    url: "https://www.aliexpress.com/item/1005010339254158.html",
    images: [
      "https://ae01.alicdn.com/kf/Sc08f3ccac0414948b17894f3f4fc7d6fd.jpg",
      "https://ae01.alicdn.com/kf/Sb3c120805c3d45f0a06bfde18ea2191fM.jpeg",
      "https://ae01.alicdn.com/kf/Sfd49e5bf19854b189c922e24de16a577P.jpeg",
      "https://ae01.alicdn.com/kf/S9c25dd7685d74e9da79d7b935ac8af77t.jpeg",
      "https://ae01.alicdn.com/kf/Sd45b35542e804e149d69d42d6b6a5e230.jpeg",
      "https://ae01.alicdn.com/kf/S5d4fdf83e9204f2d90eb16806a021e09m.jpg",
    ],
    tag: "Bodysuit",
  },
  {
    id: 2,
    title: "Bow Lace Open Bra 3-Piece Satin Set",
    price: { original: "€12.63", sale: "€8.29" },
    url: "https://www.aliexpress.com/item/1005005218607426.html",
    images: [
      "https://ae01.alicdn.com/kf/S5962e78273f64553ba9f22264002c30dy.jpg",
      "https://ae01.alicdn.com/kf/Se886d614fd9b4e07aa4bcba027d2f32cn.jpg",
      "https://ae01.alicdn.com/kf/S1365ae7868134b828108a2ca30bd57c6Q.jpg",
      "https://ae01.alicdn.com/kf/S902fcdb1bd5c460ca34089c018b2fba0z.jpg",
      "https://ae01.alicdn.com/kf/S561ed05c6a704742829ca2135a415af6Z.jpg",
      "https://ae01.alicdn.com/kf/S004c2514238d460d917e9a7de7a17e13P.jpg",
    ],
    tag: "Lingerie Set",
  },
  {
    id: 3,
    title: "Tassel Lace Open Bra See-Through Set",
    price: { original: "€11.98", sale: "€7.64" },
    url: "https://www.aliexpress.com/item/1005005253761652.html",
    images: [
      "https://ae01.alicdn.com/kf/Sbec08c44f3314720b7ff469c6aa11d1fR.jpg",
      "https://ae01.alicdn.com/kf/S5074514b09f3434688d9c611cbc0fa81T.jpg",
      "https://ae01.alicdn.com/kf/S83574ebbf81d45d1897411d5363bb545g.jpg",
      "https://ae01.alicdn.com/kf/S37ad411cf5e24d5fa1b90577fdc81203i.jpg",
      "https://ae01.alicdn.com/kf/S658344e9e3a0446fa4c46c41c5f795d53.jpg",
      "https://ae01.alicdn.com/kf/Sf593a2dda26c40399e290053b3ed29edl.jpg",
    ],
    tag: "Exotic Set",
  },
  {
    id: 4,
    title: "Fishnet Bodysuit Fantasy Lingerie Set",
    price: { original: "€18.78", sale: "€6.67" },
    url: "https://www.aliexpress.com/item/1005009137916579.html",
    images: [
      "https://ae01.alicdn.com/kf/S6202d5f801c242afa5760269ae8becdaP.png",
      "https://ae01.alicdn.com/kf/Sfe52567526d1490c9fa5f8feef03bc42c.jpg",
      "https://ae01.alicdn.com/kf/Sc7418beb973e4c609b579bb3911e198cY.jpg",
      "https://ae01.alicdn.com/kf/Sf4ea3f95739f42fca1cbe9c0cab391f5A.jpg",
      "https://ae01.alicdn.com/kf/S1e960bb0cce84c409ea6b083ff398e54j.jpg",
      "https://ae01.alicdn.com/kf/Sca189395e1444a5aa0f8ab830a47c452u.jpg",
    ],
    tag: "Bodysuit",
  },
  {
    id: 5,
    title: "Bow Lace Silk Lingerie with Garter & Thong",
    price: { original: "€18.70", sale: "€14.36" },
    url: "https://www.aliexpress.com/item/1005005859200635.html",
    images: [
      "https://ae01.alicdn.com/kf/Se58ce4f57dd84f7f8d8fa5e2a8cc5771h.jpg",
      "https://ae01.alicdn.com/kf/S37805de3f3734c07a047b32d04c567b10.jpg",
      "https://ae01.alicdn.com/kf/Se39906136e6448b89a0d32942d06c622p.jpg",
      "https://ae01.alicdn.com/kf/S6734c624be7840efaf3448cebd1e01e6e.jpg",
      "https://ae01.alicdn.com/kf/Sa24b68c64248451796b7498a4d45d007C.jpg",
      "https://ae01.alicdn.com/kf/S5ccd63634902461eaa692985896ca399s.jpg",
    ],
    tag: "Lingerie Set",
  },
  {
    id: 6,
    title: "Premium Diamond Bra with Necklace & Gloves",
    price: { original: "€29.56", sale: "€11.62" },
    url: "https://www.aliexpress.com/item/1005009186836314.html",
    images: [
      "https://ae01.alicdn.com/kf/Sea433fed841047aea87da89fe5bf759dS.jpg",
      "https://ae01.alicdn.com/kf/S70603b8bc5bb419a9a367b7d5c46f641o.jpeg",
      "https://ae01.alicdn.com/kf/Sc41930fc3dfd4cf295e4e555c710d84fH.jpeg",
      "https://ae01.alicdn.com/kf/S9cd17a6ada11455580832db2c02a4f15H.jpeg",
      "https://ae01.alicdn.com/kf/Sd1b1bb22c78441ee9f9c9cada5219c3bo.jpeg",
      "https://ae01.alicdn.com/kf/Sb990dfb385d24b00a51fe6bc8d1b47814.jpeg",
    ],
    tag: "Premium Set",
  },
  {
    id: 7,
    title: "Strapless Half-Cup 5-Piece Bodysuit Kit",
    price: { original: "€25.31", sale: "€8.31" },
    url: "https://www.aliexpress.com/item/1005010049343539.html",
    images: [
      "https://ae01.alicdn.com/kf/S8f86c5ca926d47a399002b5c53c59ca4K.jpg",
      "https://ae01.alicdn.com/kf/S236c6905fc054567afbd1d4d4e4d6cfcP.jpg",
      "https://ae01.alicdn.com/kf/S34fae7039708461e87a13eeb3b6d0ea0k.jpg",
      "https://ae01.alicdn.com/kf/Sa41b04e5617c4f2eac4b9adbe7caa090F.jpg",
      "https://ae01.alicdn.com/kf/S4a2d21a1faeb4b1faf34de83906ecd05G.jpg",
      "https://ae01.alicdn.com/kf/Saae88e58e8ce4ffbb02c1ad730bca618e.jpg",
    ],
    tag: "Bodysuit",
  },
  {
    id: 8,
    title: "Faux Leather Latex Erotic Costume Set",
    price: { original: "€27.40", sale: "€10.46" },
    url: "https://www.aliexpress.com/item/1005008844450407.html",
    images: [
      "https://ae01.alicdn.com/kf/Sae2833a642624753aff71df8b13fa3e5c.jpg",
      "https://ae01.alicdn.com/kf/S712ab3f40cec46b493c99a51ad972c5eG.jpg",
      "https://ae01.alicdn.com/kf/S3b51e77d53b64ebbaba83d36e0a05d29W.jpg",
      "https://ae01.alicdn.com/kf/S9d284b0fc59c44eb8c904e03c4cbcfbbu.jpg",
      "https://ae01.alicdn.com/kf/Sa1621be3a6ce45b48549298e6a41076d7.jpg",
      "https://ae01.alicdn.com/kf/S6922cc760df94d6f9a9466365c1a388ej.jpg",
    ],
    tag: "Costume",
  },
  {
    id: 9,
    title: "Gothic Body Harness Chest Strap Lingerie Set",
    price: { original: "€20.24", sale: "€5.58" },
    url: "https://www.aliexpress.com/item/1005006362994465.html",
    images: [
      "https://ae01.alicdn.com/kf/Sff8df1b9d69b4a33a8d145029f983f4cu.jpg",
      "https://ae01.alicdn.com/kf/S8c5da3da7ec649a1ac0ac568fab9627ex.jpg",
      "https://ae01.alicdn.com/kf/Sb4e1ba4e41a042809169830e5baa1d0fR.jpg",
      "https://ae01.alicdn.com/kf/S4772193829d84f0daabd089498f4435fa.jpg",
      "https://ae01.alicdn.com/kf/S601cafcd9c6040bba7815319db8fe17bL.jpg",
      "https://ae01.alicdn.com/kf/S0f7445d6d1c84e828da14541792e84f5J.jpg",
    ],
    tag: "Harness",
  },
  {
    id: 10,
    title: "Leather Bondage Chest Harness Strap Set",
    price: { original: "€13.94", sale: "€2.49" },
    url: "https://www.aliexpress.com/item/1005008924569379.html",
    images: [
      "https://ae01.alicdn.com/kf/Sa7a59301c2ea4b22b248f37aaac78928i.jpg",
      "https://ae01.alicdn.com/kf/S97bd43cc19a0422eb28067f3b4f5f327n.jpg",
      "https://ae01.alicdn.com/kf/S3b0a80dd4d9e44f090debf70a79eb1ebl.jpg",
      "https://ae01.alicdn.com/kf/Sf924a2a670ae4bfbb0bd8d9d567d425cs.jpg",
      "https://ae01.alicdn.com/kf/S9a8907de423f46dcb919ba134f91e8c0A.jpg",
      "https://ae01.alicdn.com/kf/Sc9efadbb76c3411d9b46318695193c09K.jpg",
    ],
    tag: "Harness",
  },
  {
    id: 11,
    title: "Body Harness Leather Bra & Leg Garter Set",
    price: { original: "€23.65", sale: "€9.02" },
    url: "https://www.aliexpress.com/item/1005006683306921.html",
    images: [
      "https://ae01.alicdn.com/kf/S8a6099198af54dddb382ffc95c3cb1ba7.jpg",
      "https://ae01.alicdn.com/kf/S43d4b40b375b427db01b5d37381b7260t.jpg",
      "https://ae01.alicdn.com/kf/S7a11934c0c5243a2b9330aedce68bbf27.jpg",
      "https://ae01.alicdn.com/kf/S3cab8079e41b454d9b91c7fda3a15c2fY.jpg",
      "https://ae01.alicdn.com/kf/S045f435a7896469eb0713bce001a4684H.jpg",
      "https://ae01.alicdn.com/kf/Sa9740dbf34964ccb99e4664405544828p.jpg",
    ],
    tag: "Harness Set",
  },
  {
    id: 12,
    title: "Full Body Harness Garter Belt Lingerie",
    price: { original: "€27.19", sale: "€10.83" },
    url: "https://www.aliexpress.com/item/1005006202996896.html",
    images: [
      "https://ae01.alicdn.com/kf/S01300ac5fe6b400ebbba84435e55013bM.jpg",
      "https://ae01.alicdn.com/kf/S0d54f3696d58442bbf71e52cd4c764d4K.jpg",
      "https://ae01.alicdn.com/kf/S351ddedec5f14bc68a4c43f4ece6ff1bS.jpg",
      "https://ae01.alicdn.com/kf/S061fc2a36a2842e5a9cc1c2c01a955bat.jpg",
      "https://ae01.alicdn.com/kf/S3900f1930e4f4d2f93846cfe4e319f6d7.jpg",
      "https://ae01.alicdn.com/kf/See7521cc7e744ca1bbd14ecf1cb68de5e.jpg",
    ],
    tag: "Harness Set",
  },
  {
    id: 13,
    title: "PU Leather Leg Harness Garter Belt",
    price: { original: "€11.39", sale: "€1.35" },
    url: "https://www.aliexpress.com/item/1005008702984662.html",
    images: [
      "https://ae01.alicdn.com/kf/Sd965f3a63bfc4c33a6280d1e97efe255I.jpg",
      "https://ae01.alicdn.com/kf/S8559a73d6b7549a5ad575d6344812858O.jpg",
      "https://ae01.alicdn.com/kf/Sb37fd2d87e614f5b898474d3fdf5fe2dl.jpg",
      "https://ae01.alicdn.com/kf/Sc06aebedd2434dc6b9cf1a497087fccci.jpg",
      "https://ae01.alicdn.com/kf/Scd1339690624404691a26ed3567c81747.jpg",
      "https://ae01.alicdn.com/kf/S4e381bc3f8854ab2889806533d73f414z.jpg",
    ],
    tag: "Leg Harness",
  },
];

export const existingHarnessProducts: ExistingHarnessProduct[] = [
  // Priority items — shown first
  {
    id: "8573526770011",
    title: "Aria's Lingerie Set",
    price: "$36.99",
    handle: "12",
    images: [
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/Untitled-7_6a2597aa-eb91-4573-8e86-395eacb380a9.png?v=1734135994",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/Untitled-6_9a8643bc-985f-44c1-a66c-e535f5664a7c.png?v=1734135950",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/Untitled-5_8c817f0a-0932-4af8-831f-2c81816a6d75.png?v=1733940575",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/Untitled-8_9ba45f7b-b777-4d2f-aa09-152048a8d907.png?v=1733940575",
    ],
    tag: "Lingerie Set",
  },
  {
    id: "8592041771355",
    title: "Aubrey's Bodysuit",
    price: "$46.99",
    handle: "24",
    images: [
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/main-image-1_5be7b8c0-e4e8-427f-85da-87d73c7d4f64.jpg?v=1738392947",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/main-image-3_32e24d8e-40e4-4c8a-833c-77297d2801ef.jpg?v=1738392989",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/main-image-4_b4436794-b6e1-4561-acba-05dc92dafab5.jpg?v=1738392989",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/main-image-2_e9cd1899-6d09-4cea-8e26-0f81e6694310.jpg?v=1738392989",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/main-image-5_2e6075ba-ca82-4c3d-aeb9-9a8006377f1c.jpg?v=1738392884",
    ],
    tag: "Bodysuit",
  },
  // Harness collection
  {
    id: "8634998980955",
    title: "Ariel's Harness Set",
    price: "$53.99",
    handle: "47",
    images: [
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/9.jpg?v=1712312830",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/00.jpg?v=1713704177",
    ],
    tag: "Harness Set",
    onSale: true,
  },
  {
    id: "8635003535707",
    title: "Piper's Harness Set",
    price: "$42.99",
    handle: "53",
    images: [
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/74.jpg?v=1713703778",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/75.jpg?v=1713703778",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/76.jpg?v=1713703778",
    ],
    tag: "Harness Set",
    onSale: true,
  },
  {
    id: "8635003175259",
    title: "Jade's Harness Garter",
    price: "$25.99",
    handle: "52",
    images: [
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/36_9415bce0-833a-4695-80dd-c0935ea9910c.jpg?v=1711465433",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/37.jpg?v=1711465433",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/38.jpg?v=1711465433",
    ],
    tag: "Harness Garter",
  },
  {
    id: "8635002683739",
    title: "Valentina's Demon Wings",
    price: "$33.99",
    handle: "51",
    images: [
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/34_21f69518-9859-4923-893f-cbe912d8dc60.jpg?v=1711465404",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/35_06107afb-17d9-4ca0-82b4-2c7245fe16ed.jpg?v=1711465404",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/main-image-3_91275002-88f6-40fa-9230-7c007bff477e.jpg?v=1711465384",
    ],
    tag: "Wings",
  },
  {
    id: "8634999177563",
    title: "Quinn's Harness Set",
    price: "$49.99",
    handle: "49",
    images: [
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/dsdsadad.jpg?v=1718199094",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/6_bc9a557e-cd1f-48b2-a8d1-1d1c29544e31.jpg?v=1718199094",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/WebsitdsaePics.jpg?v=1718199094",
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/daasdadsa.jpg?v=1718199067",
    ],
    tag: "Harness Set",
  },
  {
    id: "8634997965147",
    title: "Zara's Facemask",
    price: "$23.99",
    handle: "43",
    images: [
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/14_6428d884-4922-4513-af65-a8f5501ae0f3.jpg?v=1711463434",
    ],
    tag: "Facemask",
  },
  {
    id: "8634997899611",
    title: "Genevieve's Facemask",
    price: "$25.99",
    handle: "42",
    images: [
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/product-image-1823522233.webp?v=1711463369",
    ],
    tag: "Facemask",
  },
  {
    id: "8634997834075",
    title: "Celeste's Facemask",
    price: "$25.99",
    handle: "41",
    images: [
      "https://cdn.shopify.com/s/files/1/0726/5511/0491/files/12_94c63348-b461-40c8-b9b0-2279dbc877e2.jpg?v=1711463343",
    ],
    tag: "Facemask",
  },
];
