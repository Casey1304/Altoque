export const INITIAL_CATEGORIES = [
  { id: 'libros', name: 'Libros de texto', icon: 'menu_book', count: 24 },
  { id: 'electronica', name: 'Electrónica', icon: 'devices', count: 18 },
  { id: 'laboratorio', name: 'Equipo de Laboratorio', icon: 'science', count: 12 },
  { id: 'papeleria', name: 'Papelería', icon: 'edit_note', count: 35 },
];

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: "Calculadora Científica Casio fx-991EX",
    category: "electronica",
    categoryLabel: "Electrónica",
    condition: "Usado - Como Nuevo",
    price: 25.00,
    currency: "S/",
    rating: 4.8,
    reviewsCount: 12,
    brand: "Casio",
    model: "fx-991EX",
    meetingPoint: "Entrada Principal - Campus San Joaquín",
    description: "Calculadora científica en excelente estado, usada solo durante un semestre para un ramo de cálculo. Incluye tapa protectora original. Funciona perfectamente, ideal para estudiantes de ingeniería o ciencias. No tiene rayones en la pantalla.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBENRdOAHcy_RbVJjeklHw3c2bVSjMGAExYFUe3wwBDs1P2XVWcH_HlTkb7hZKoPOxf7kOz_FHDEVi-m8LWhLPgIeoehp3h3x5dN-DFr3TvMIxEfSCsdll0E7S6lOqx5PIYoYXHbOE3qb4wbT2EGNnwXKTSo71EZKk0sErrm06d2gvzGxqAYZWLyo8J16tYTXxbKEt_ecdkbxIMbCXZpZmOFGaej0s9VdPMpbNXVt1x5nghEGmgPpY1",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBENRdOAHcy_RbVJjeklHw3c2bVSjMGAExYFUe3wwBDs1P2XVWcH_HlTkb7hZKoPOxf7kOz_FHDEVi-m8LWhLPgIeoehp3h3x5dN-DFr3TvMIxEfSCsdll0E7S6lOqx5PIYoYXHbOE3qb4wbT2EGNnwXKTSo71EZKk0sErrm06d2gvzGxqAYZWLyo8J16tYTXxbKEt_ecdkbxIMbCXZpZmOFGaej0s9VdPMpbNXVt1x5nghEGmgPpY1",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTw2SyNgBXQ8zIM8bUNTYcQPM_yyMPZrkS4LUycoAv0bvi8d5aRR3DDC-9ogMc3lLgkfRVxAS8Lty-CAFTN7Vl3jfRHwN6WhVmt2Yp2AcCDioVrASnGO1zhZ9woMLpTalPvYxGO74l1Pod7YNeKju7N5_-cWV7fx1zbyF-5rpX68PTmWfxnwDS_qQnhlzfl0DRxEUO8zKq0k1GmFScvy1C9ZkQH4M2YhoOVbGaeta9YkmbWSDA9m2G",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwM5P7lFQVHqyWl3_BvJSgrEmx2aBibjJ6FtCvq3KnugriGzQ94f4zCPXF1n-nxnOXzJWIkY1N42votfniLQt6E3uGUdF7MT-KohLqKU94cMMT7io20TGuDjzKRwqJk_adCBXHAPvZCUnw8LXOiWAuLaBEDbkMpHx1Nj6kIJ_X0m8gmm5eELkwP0iPYyGmML_2qxnaMPZIAj-EX0vNLZu-Q97hhoiipvW5dfcZsz9YRLk-YptQvFBH"
    ],
    seller: {
      id: "seller-1",
      name: "Tomás V.",
      degree: "Estudiante de Ingeniería Industrial",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2yIKHZcr1TEon6XAD5Zy2MqvYQMXfxGcXoOGAz8u0Z9oevtCa4_ed56IdCO430aMIr3QZexHk9kzHPQTd5nKqRaoHCAeBZPkkvLtkqrI3sR4mgwsOxxAhXYQtQAz-fLMzXDPTRze55UUQdIxRa6EsFWeIwsXSKgLAt_DqRhlD-v8-k25NgBRZoN2qtZfF1ffWDF5xnD97KhUCLXQI3gmLCiYKFXTdEQQ6804HSJx5B9mCE4jKwCKw",
      rating: 4.8,
      tradesCount: 12
    }
  },
  {
    id: 2,
    title: "Bata de Laboratorio 100% Algodón (Talla XL)",
    category: "laboratorio",
    categoryLabel: "Equipo de Laboratorio",
    condition: "Nuevo",
    price: 18.50,
    currency: "S/",
    rating: 4.5,
    reviewsCount: 8,
    brand: "LabCare",
    model: "Algodón Premium XL",
    meetingPoint: "Pabellón de Ciencias - Campus Central",
    description: "Bata de laboratorio totalmente nueva, empaquetada. 100% algodón grueso de alta resistencia para prácticas de química y biología.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB1drTvlkbV1g_8oZMtGg3Qjqj4gQwJHab0UTv5xwSZi4vgDTdeZ7G93vSl0YGZ1AjSU588jf75Y9XbrxBstWzs_G8m0pXNJ9CdXtgSYaDwNndvtqAJngQsahNJD-32yaOAjJwu7ol_npLFp1j5TaHRlz5NROIyozXWkC6RFWUP8if7cmcUUDF9VhVBeBaWh_QlEfpQCT_9KryK6buSuntVircGVudsXjkNhaVyB3vLnsADDya4Eor",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBB1drTvlkbV1g_8oZMtGg3Qjqj4gQwJHab0UTv5xwSZi4vgDTdeZ7G93vSl0YGZ1AjSU588jf75Y9XbrxBstWzs_G8m0pXNJ9CdXtgSYaDwNndvtqAJngQsahNJD-32yaOAjJwu7ol_npLFp1j5TaHRlz5NROIyozXWkC6RFWUP8if7cmcUUDF9VhVBeBaWh_QlEfpQCT_9KryK6buSuntVircGVudsXjkNhaVyB3vLnsADDya4Eor"
    ],
    seller: {
      id: "seller-2",
      name: "Alex Rivera",
      degree: "Estudiante de Química Pura",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKfNsqwjH7aRfW41lhyBjK3vRzM1j_WGqTXXQPKC-qjXx3t5CxPutrQmcdMGksU34YqeA36VEb-l_2MOUNKXz8GYt1fFE0YHDOk6pdXHIg4c3fFkFcIGq9J_zmXp-l6_UZh3PToaug5IOIC1BO1DlsjKqzElLNfZxa1wmytqCZ0fGUwUwFZRAsPhcrjszBP8fKach_UwUOnnlNrl9NSPXOu0TC5c92flsuA91n08D0JV4GUvqUfuiTnQ",
      rating: 4.8,
      tradesCount: 42
    }
  },
  {
    id: 3,
    title: "Química Orgánica - Paula Yurkanis Bruice (8va Ed.)",
    category: "libros",
    categoryLabel: "Libros de texto",
    condition: "Usado - Buen estado",
    price: 45.00,
    currency: "S/",
    rating: 4.9,
    reviewsCount: 15,
    brand: "Pearson",
    model: "8va Edición Tapa Dura",
    meetingPoint: "Biblioteca Central - Piso 2",
    description: "Libro de Química Orgánica en excelente estado. Páginas intactas sin subrayados con resaltador permanente. Incluye CD complementario y acceso a recursos en línea.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6HNwiX2kct3znn99alPoTrHyGI4jbRNexi8T4Q0sHrQPQG__Vsy6CkfcUY3_j-tZ1WEo2H0tqmBNk5_vor3qCDKa30A9f9XuaDfVxH8eTewN4NPRi6vupkxuXLLDdByvFO3zuCf9hpAw-b4vHoeBST1EhOsV_tzNE4p7zWIgEB09LnZlihOrn1h1OgB0CnWdLI8Vrut1X4UdPNokd26IsaN1nMVJTdnh6xcD6HzwckVoFBvNvCWeX",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6HNwiX2kct3znn99alPoTrHyGI4jbRNexi8T4Q0sHrQPQG__Vsy6CkfcUY3_j-tZ1WEo2H0tqmBNk5_vor3qCDKa30A9f9XuaDfVxH8eTewN4NPRi6vupkxuXLLDdByvFO3zuCf9hpAw-b4vHoeBST1EhOsV_tzNE4p7zWIgEB09LnZlihOrn1h1OgB0CnWdLI8Vrut1X4UdPNokd26IsaN1nMVJTdnh6xcD6HzwckVoFBvNvCWeX"
    ],
    seller: {
      id: "seller-2",
      name: "Alex Rivera",
      degree: "Estudiante de Química Pura",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKfNsqwjH7aRfW41lhyBjK3vRzM1j_WGqTXXQPKC-qjXx3t5CxPutrQmcdMGksU34YqeA36VEb-l_2MOUNKXz8GYt1fFE0YHDOk6pdXHIg4c3fFkFcIGq9J_zmXp-l6_UZh3PToaug5IOIC1BO1DlsjKqzElLNfZxa1wmytqCZ0fGUwUwFZRAsPhcrjszBP8fKach_UwUOnnlNrl9NSPXOu0TC5c92flsuA91n08D0JV4GUvqUfuiTnQ",
      rating: 4.8,
      tradesCount: 42
    }
  },
  {
    id: 4,
    title: "Set de Estilógrafos Rotring (0.1, 0.3, 0.5)",
    category: "papeleria",
    categoryLabel: "Papelería",
    condition: "Usado - Aceptable",
    price: 12.00,
    currency: "S/",
    rating: 4.2,
    reviewsCount: 6,
    brand: "Rotring",
    model: "Tikky Graphic Set",
    meetingPoint: "Facultad de Arquitectura",
    description: "Set completo de 3 estilógrafos técnicos de precisión. Tinta fluida, puntas calibradas, ideal para dibujo técnico y diseño arquitectónico.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgYltquu-2hJcTr6Qq6mdmDVrwbMQ9F8MAR9zweyU1PkFsp5Rwgm-chxkLFCF4KuPVAOGjwRcDmtnz3OAAR_o8MRhaZqjCiZ6wfeMvZ3h4Xig8TjRQ6qWoks8H_Gb61HNmpZM_1oM2FfJUuWS6o7OXUhQGlk68jaUnSxsgDZfJnf5AD8gOnUUgBnelnNcGwNohsq1XwVs3gy7HGZLOF4tpFljaqunOCZJ1SIW_OKDg0bzaFMq3zAeU",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgYltquu-2hJcTr6Qq6mdmDVrwbMQ9F8MAR9zweyU1PkFsp5Rwgm-chxkLFCF4KuPVAOGjwRcDmtnz3OAAR_o8MRhaZqjCiZ6wfeMvZ3h4Xig8TjRQ6qWoks8H_Gb61HNmpZM_1oM2FfJUuWS6o7OXUhQGlk68jaUnSxsgDZfJnf5AD8gOnUUgBnelnNcGwNohsq1XwVs3gy7HGZLOF4tpFljaqunOCZJ1SIW_OKDg0bzaFMq3zAeU"
    ],
    seller: {
      id: "seller-3",
      name: "Ana Silva",
      degree: "Estudiante de Diseño",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8NB53pDidM6itgF-ApH98cbw3DaoiNm-YNzphwVWKpegLST9NcBzcbis-cNiV3Qon5eSVCfI-ePVz_xzKooQtChOe6Z3KG10Yg2_yXQ_z-etjlZJhpBvL4jdavsijOJTO9_zZqhlh-8Xu7Eb2_fPXCKOj8tM8vjAGUGBH6bw9g1kNUlloho4xx8vN9MAfCj47is7pymZT-AMFX7D3IOEPR8Id8KQiOdkEUf0Ume-uZIZ19SAG5EpwGA",
      rating: 4.9,
      tradesCount: 20
    }
  }
];

export const INITIAL_USER = {
  id: "user-me",
  name: "Estudiante AlToque",
  email: "estudiante@universidad.edu.pe",
  university: "Universidad Tecnológica del Perú (UTP)",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9orOq_BGxDlUKEYNa9ynLeFDL1V0u-GMbh0WfiwYd4k4yohbENEYN5rl-ru6XlCFtBhedHSTcDvEnoGm9-FPDSdv94D3209bHXEFPJ06NV0oRUcpkrum90HG9fNhHiJiflGXP3r8MgS7GVxesVlc8jBS9XdjgP5qlRtZNq0oiZ9coVbh_f6MSJ4g2YLtli3_J3xekX2Dtue4VxQVmAD-TNCIEB3Ph_zB64TV2jOJiYE38FibD0aDu"
};

export const INITIAL_CHATS = [
  {
    id: "chat-1",
    type: "compras",
    user: {
      id: "seller-1",
      name: "Carlos Mendoza",
      rating: "4.8",
      trades: "12 ventas",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJC2EwYmnJ4JoiCuenfEKK4wlacL4Z33fowNuoFebt6wHEi3Wlc6GpBQ4EBCFpTS1OUuKR0mekPZENzC8EuoHctfOUDFZqz564WSySjnqQbcY43p_JkRrmNEu7KanBu8cLTcE4dFHZ_-4w9CeYUwpH9ENtIc8eW7VRQ5Wq4jv0AWf4TZ_tzpWRaIhmc3jcAcb80d1YzUwGqrfuCIY0z8emAaKhtSI6CnDjKtnL8M8YE261EI_PGN-aoQ"
    },
    productTitle: "Calculadora Casio Fx-991ex",
    lastMessage: "¡Genial! Nos vemos en la biblioteca entonces.",
    time: "10:30 AM",
    messages: [
      { id: 1, sender: "them", text: "Hola! ¿Aún tienes la calculadora disponible?", time: "10:24 AM" },
      { id: 2, sender: "me", text: "Hola Carlos, sí! Está disponible y en perfecto estado.", time: "10:26 AM" },
      { id: 3, sender: "them", text: "Excelente, ¿te parece si nos encontramos hoy en la Biblioteca Central a las 2 PM?", time: "10:28 AM" },
      { id: 4, sender: "me", text: "¡Genial! Nos vemos en la biblioteca entonces.", time: "10:30 AM" }
    ]
  },
  {
    id: "chat-2",
    type: "compras",
    user: {
      id: "seller-4",
      name: "Ana Torres",
      rating: "4.9",
      trades: "18 ventas",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_Q96IFDVQLgOLShqmCIY8C8v4s0NYyr_98HoZA_fSmAxtIG5EMMjmCF1p57y_uP9GE4nolCdsXZZNyT9RT9oVgO0xyt9e2euwH9eKkxHzFvC8eXcVHPWLrvPdBHFXvQhbAunJl67nmNPXTELKX6jjul055rODCa1r8YuMic3PAAcbSvNaAygvPm2-Z4HPozyeXcFPgnoSTwjU9DRHmbOOF5Dap0ufdOpBuucVw_7adkZN3M-98slhIw"
    },
    productTitle: "Libro Stewart 8va Ed.",
    lastMessage: "¿Todavía tienes el libro de Cálculo?",
    time: "Ayer",
    messages: [
      { id: 1, sender: "them", text: "¿Todavía tienes el libro de Cálculo?", time: "Ayer 4:15 PM" },
      { id: 2, sender: "me", text: "Sí Ana, ¿en qué campus estudias?", time: "Ayer 4:30 PM" }
    ]
  },
  {
    id: "chat-3",
    type: "ventas",
    user: {
      id: "seller-5",
      name: "Luis Ramirez",
      rating: "4.6",
      trades: "5 compras",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYAbD-sPEG21QSFJ9c-kHGZ60IjUjR7T0Qp0kfrM7kHOX4r3VyyXjSDeZpvS3Sc3ARf5_FE8xUiUW2N_4EfOCsknK49ETTO5hqa2RgbExpADhn6LwUEHHFWOL0AagAj04gsNEXhdxFzMJidlV6EWjzA7NA6yc1WUpl3zc_uIUDnIDtYLAHCP3k5U3tGlzVl_6-JPFf883iANbst9RPa1hC72BZJOSHhkSBDcM8L9ilC2tKYbxQ0jx4QA"
    },
    productTitle: "Teclado Mecánico Redragon",
    lastMessage: "Te ofrezco 50 soles por el teclado.",
    time: "Mar",
    messages: [
      { id: 1, sender: "them", text: "Hola amigo, ¿te ofrezco 50 soles por el teclado?", time: "Mar 11:00 AM" }
    ]
  }
];

export const INITIAL_PURCHASES = [
  {
    id: "pur-1",
    title: "Bata de Laboratorio XL",
    category: "Equipo de Laboratorio",
    sellerName: "María Fernández",
    price: "S/ 18.50",
    date: "12 Oct 2023",
    status: "Entregado",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbcpsrzgEuH3rVXMx5N9Chn2qnYJAENnv-q9zxSmKeK4uGmJH5Ebg8hzW-uGuyXr_exgQe7NyQFRK_75bwCMNy6J9S3KDU4FyjEt5tgTu-_ctq_klmNS68IfgSj9sLWYKBOY-Z3K_G1s1OnHbiSE2euRD6mKAR7ZEJg6lXoGNpe69AdwQsCCkPyE2qHe9WlJlkUGDpSUK7IkTLyEj21iGnbJnZS4tPYzofEvb-qVpDzTDNoKAChAA-"
  },
  {
    id: "pur-2",
    title: "Calculadora Científica Casio",
    category: "Electrónica",
    sellerName: "Juan Pérez",
    price: "S/ 25.00",
    date: "05 Nov 2023",
    status: "Por entregar",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiE9lWWz81igBnCRqdtHif9Ksr95iGPg3ax7OdiwtKUbS_yHfZmjozFmoImv7iWhndjPKTj_w6RD2IJGvKj8OewRmj1FXsyBhhraAQaXpS20OTSzIIA0Ov65Cc0M6YMqP53KJpqlQepFecvNMyTx2o64P5z_0v_sTVZo9SE2SA4TipnskyxucVCTmFmX1jR9hT9EivF2Uwnlu5apjQfNWpx6R_-uIS2WuNSde3am7b71K9qVBgm5j4"
  },
  {
    id: "pur-3",
    title: "Set de Estilógrafos Rotring",
    category: "Papelería",
    sellerName: "Librería Central",
    price: "S/ 12.00",
    date: "28 Sep 2023",
    status: "Entregado",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCf4RyoanZh6ShkHewx35_hpmxRNf46MlHsEmPD4o6_x707rsbD-vQMXSb3oxcFxm7JTFUctRMM79e4yU_4yYP-d06_Fu_M5F3I8cV46Y9Qy2VJGjB64IZHffotWcuHtkPqpH0NxQQOV003OpUQWxe7OK3tRYNS8PAzlQvYJJWkdI71_w7sIn_kO2XwkjnDZEnUYihWV2e_dPgpOavCrVvdnZd2Rj5Oq-fnRLhJgwJQDgwyeszOIir1"
  }
];

export const INITIAL_SELLER = {
  id: "seller-2",
  name: "Alex Rivera",
  degree: "Estudiante de Química Pura",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKfNsqwjH7aRfW41lhyBjK3vRzM1j_WGqTXXQPKC-qjXx3t5CxPutrQmcdMGksU34YqeA36VEb-l_2MOUNKXz8GYt1fFE0YHDOk6pdXHIg4c3fFkFcIGq9J_zmXp-l6_UZh3PToaug5IOIC1BO1DlsjKqzElLNfZxa1wmytqCZ0fGUwUwFZRAsPhcrjszBP8fKach_UwUOnnlNrl9NSPXOu0TC5c92flsuA91n08D0JV4GUvqUfuiTnQ",
  rating: 4.8,
  reviewsCount: 124,
  badge1: "Preferido por los usuarios",
  badge2: "Vendedor Top",
  memberSince: "Marzo 2024",
  tradesCount: 42,
  bio: "Estudiante de último año apasionada por la sostenibilidad. Siempre cuido mis libros y equipos de lab. ¡Encuéntrame en la biblioteca los martes!",
  reviews: [
    {
      id: "rev-1",
      author: "Sarah Jenkins",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpOUa2ya_BT4Ultx3eDggzXIDvQPSHLwkH8NJm9NaubVhFJVUcFxbU6IGFkr-ndL0d_lzDUyWmkwdFf6KsaoS3_ILUUzEoE6drw8lQBiWd8ydisVI-VpHja6NMWPU7TYB6_DB1et4LlBd4-Xq6wb00aTc_za0Nmh3T0JBOH1WjAg62MhtDimgWx-I6gndzjSxtyAA-EAkMSPXZVWyXn1xsQtpI7l2sR1xWBsnGRNJOLVBhKLXnR11tmQ",
      date: "Hace 2 días",
      rating: 5,
      comment: "Comunicación rápida y el libro estaba en perfecto estado como se describía. ¡Definitivamente volvería a comprarle a Alex!"
    },
    {
      id: "rev-2",
      author: "Mateo Silva",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCY9bv3_a88526vd1eS3sjQ3ROJcjeQKKVXvWsJg43rb5ycQB6lBgzHrdDLhmEMml_Nmz4lR_opJZ_Mh905_LLOWOr1zseuP2GtfWf4RZxH-c-pzvzCU44P-KTqz69BQYDkN7DdLHw_GuaEKgxT3YjhAXZ75T2uJ6AYwbIc6248OTsozBH7GG3DBWRn06X7DDefPiWSAL7pqjA3qDM0775p6-8cGnV7wTIuwlX5egMeIp4IEu6fpJxP0A",
      date: "Hace 1 semana",
      rating: 5,
      comment: "Puntual en el punto de encuentro acordado en la biblioteca. La bata de lab estaba impecable."
    }
  ]
};


export const INITIAL_STUDENTS = [
  {
    id: 1,
    name: "Mateo Morales Vega",
    code: "U20219482",
    email: "m.morales@utp.edu.pe",
    faculty: "Ingeniería de Sistemas",
    campus: "Campus Lima Centro",
    cycle: "8vo Ciclo",
    rating: 4.95,
    reviewsCount: 48,
    salesCount: 31,
    purchasesCount: 14,
    status: "verified", // verified, pending, warning, suspended
    idCardVerified: true,
    lastActivity: "Hace 12 min",
    lastAction: "Venta: Calculadora Casio FX",
    isOnline: true,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBn7pGNzlw0rnSD6ivETcW-eeRASUzKVraXd6i7AI0X2I5wMVIbimjpJWo0VpEemL4uaGNvyb3hEIJz3Rgivw_htWL6xqZVwpWBfTb1AASJkV6rW8wxrFlTKdRpzx5VvCdzHZptxg8dMGzDDihzo7Ud813jByzVNQ7LiWzU0Ehv6DlbPT33qbmntfhmvR2-Z0cVspF0MS3rQg-C6KNdxoKEqNzmxTT2dNBuVvC4OII"
  },
  {
    id: 2,
    name: "Camila Valdivia Ríos",
    code: "U22108711",
    email: "c.valdivia@utp.edu.pe",
    faculty: "Arquitectura & Diseño",
    campus: "Campus Lima Norte",
    cycle: "4to Ciclo",
    rating: 4.80,
    reviewsCount: 12,
    salesCount: 9,
    purchasesCount: 8,
    status: "pending",
    idCardVerified: false,
    lastActivity: "Ayer 18:40",
    lastAction: "Subió foto de carnet UTP",
    isOnline: false,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIoK6a-XzB_4ZQGTT8trjJJ8lwskc5oOZXtJwvnaI2avs0uWPTsZc0KJ6NNUDlNxBELmvkg-YEixv05uj-LYb3tHUYriXTUPcghb89cAZrDEmcJYwqm0uhmNk4yLVSPxfwqo2E5DX-ezzFBmRtPZ8bF-JlWDNqfVND9BGFlQA8Ui1BCNdL8KdoBI50aBozrIT1VdauUlZmOLpo3DckSxqA2SSodc13CZjMHhe0wBM"
  },
  {
    id: 3,
    name: "Renzo Palacios Díaz",
    code: "U19302119",
    email: "r.palacios@utp.edu.pe",
    faculty: "Administración y Negocios",
    campus: "Campus San Juan",
    cycle: "9no Ciclo",
    rating: 3.20,
    reviewsCount: 19,
    salesCount: 14,
    purchasesCount: 3,
    status: "warning",
    warningsCount: 2,
    idCardVerified: true,
    lastActivity: "Hace 2 horas",
    lastAction: "Reporte por no entregar producto",
    isOnline: false,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ0Ojif2iwmTdwJ3hWJT_XP0jXNF26OE2ZzfXi1rskfO9ORfjWUXG6gxS2v9lC4_-wReP2SZjPCHcEYiyuYzKc0FC5TOOI9mNT6qyGkEKAuPdfdH7quuoOl7Q9P-WZPOZRafMdZGbCSF-1E6D1NP12Cxng2Ymyypdim-4xPTb-Z9_bxj-5XJimW9eECreRgF5cYzegLTe3CE10EK8GmeeYDIY7pS8BWdAYjSAAXd4"
  },
  {
    id: 4,
    name: "Luciana Barreto Ponce",
    code: "U21300941",
    email: "l.barreto@utp.edu.pe",
    faculty: "Ciencias de la Salud",
    campus: "Campus Ate",
    cycle: "6to Ciclo",
    rating: 5.0,
    reviewsCount: 64,
    salesCount: 58,
    purchasesCount: 22,
    status: "verified",
    idCardVerified: true,
    lastActivity: "Hace 35 min",
    lastAction: "Publicó: Estetoscopio Littmann",
    isOnline: true,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzL6sIvbp_WUJs9q19tjDn5w3bXWWgho9Ymsq-T8GFsinZLM_abqYgIxi_4CgGKOTqdGw2Xx0qwj8vx047TbxEclYZrS5aByc2l9-RDUeGbPyodSXV_gSN9Ye_Bg48qL0KVlOReGN1tmFCl7wGx_aZQOhip7wb2TENG7Yi-LMnyw_YuQLQniwu8pLULOLH6EAFXIMD9-_lubtANr_lR30jZeWvbZwZSh0k6oqzgNo"
  },
  {
    id: 5,
    name: "Diego Huamán Castillo",
    code: "U18204992",
    email: "d.huaman@utp.edu.pe",
    faculty: "Derecho y Humanidades",
    campus: "Campus Lima Centro",
    cycle: "10mo Ciclo",
    rating: 2.10,
    reviewsCount: 8,
    salesCount: 4,
    purchasesCount: 1,
    status: "suspended",
    idCardVerified: true,
    lastActivity: "Hace 3 días",
    lastAction: "Cuenta suspendida por infracción",
    isOnline: false,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCimDlzbqiCAgVXvVMelZ6LCdsdK7CtLg_P-AaO5dJz6-TKNr9a3c-HLpjbFL3-Tqk3Mw6P0BJYyOjDQKc6SyJi6XeKGRJFVgubU6JFRfPf8Dw-xrpeUtYzL8lJ71lagH177swpRhhQ3cp3kPQsRu_JYAPzLWn-6V205r02zDQGdx7jc5DPJeW1dlLVzBJ5RL2FauZ2YeAaz6fn0FiriF9365aqDKoCg4QONVnfV9o"
  }
];

export const INITIAL_MODERATION_ITEMS = [
  {
    id: "mod-1",
    artId: "#ART-89412",
    title: "Calculadora Casio fx-991EX ClassWiz",
    category: "electronica",
    categoryLabel: "Electrónica",
    condition: "Usado - Como nuevo",
    price: 65.00,
    refPrice: "S/ 120.00",
    currency: "S/",
    sellerName: "Tomás Vargas Ramos",
    sellerCode: "U20304918",
    sellerFaculty: "Ing. Industrial",
    sellerEmail: "t.vargas@utp.edu.pe",
    sellerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ3EPwvDx2e7U_iMQntBFB0XYjHb_i6dYt59ppCSEMdz761NUURDGduTZoXGjgBozc8KACqQoirbGm8qty_lHxUxmxthyes7ZbqGz49nW2SSCmgQU-XmtU4azti8MvmP58Qtx38wqicpc2nRiJBhz0hs7REP7H9XSWmbJVAhhNJgvxfTiDd9SMpO7SIv0ne64Z14kDyy6Bm9oA4g5Nh39dp_iC8qKb_tIGsD9_vpE",
    seller: {
      name: "Tomás Vargas Ramos",
      code: "U20304918",
      faculty: "Ing. Industrial",
      email: "t.vargas@utp.edu.pe",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ3EPwvDx2e7U_iMQntBFB0XYjHb_i6dYt59ppCSEMdz761NUURDGduTZoXGjgBozc8KACqQoirbGm8qty_lHxUxmxthyes7ZbqGz49nW2SSCmgQU-XmtU4azti8MvmP58Qtx38wqicpc2nRiJBhz0hs7REP7H9XSWmbJVAhhNJgvxfTiDd9SMpO7SIv0ne64Z14kDyy6Bm9oA4g5Nh39dp_iC8qKb_tIGsD9_vpE"
    },
    deliveryPoint: "Patio de Banderas - Torre A (Sede Lima Centro)",
    campusDeliveryPoint: "Patio de Banderas - Torre A (Sede Lima Centro)",
    status: "pending", // pending, approved, changes_requested, rejected
    alert: "Alerta: Posible duplicado / precio 40% debajo de media",
    aiAlert: "Alerta: Posible duplicado / precio 40% debajo de media",
    photosCount: 4,
    time: "Enviado hace 12 min",
    timeAgo: "Hace 12 min",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnsKcEN9aDrr5EeVWe3dZLAWD90tDAK0kEU3fmdxoj1VGix6It5MgmP3yE8XwYMaQr_i4xmDwn1YKotuv-0jn6OdtlFgOBPbHF7M4Og5pkmDnDMpjxkvpFfhD6vlz2BFnovsR_MxpWkNKy-yjTmsE6HzBQJQEqULdZGrpNXmCjcJOaZOH45HDGo0UhUAec8WLSvpMZVrGIS6ovcB8dhnOUmXbAdLrB_N0L7Fv2K_U"
  },
  {
    id: "mod-2",
    artId: "#ART-89410",
    title: "Bata blanca de laboratorio 100% algodón (Talla M)",
    category: "laboratorio",
    categoryLabel: "Laboratorio",
    condition: "Buen estado",
    price: 35.00,
    refPrice: "S/ 35.00",
    currency: "S/",
    sellerName: "Camila Solís Mendoza",
    sellerCode: "U19284102",
    sellerFaculty: "Enfermería",
    sellerEmail: "c.solis@utp.edu.pe",
    sellerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfuVsyZeXsfN1eOGkD3I8SKQUQ8htcNc4NbpAFxru-F2aCkbQshkbxyfjlG2xUvo7bbMU3BdBtYOgExkF2BCk_B3lQDs05NkuX3htV3vdfTCRyc37lO3nEMSPq7Kcv8Wgxn-y-AxTTof7-nCib1fNtpQd3T-MtUBt46XAcff0fBVUqchdyx82K_44uXoYoB9J_O0BubVLl_eyvuZIyWDeObgLkNLs1EyFBW6Ywxhk",
    seller: {
      name: "Camila Solís Mendoza",
      code: "U19284102",
      faculty: "Enfermería",
      email: "c.solis@utp.edu.pe",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfuVsyZeXsfN1eOGkD3I8SKQUQ8htcNc4NbpAFxru-F2aCkbQshkbxyfjlG2xUvo7bbMU3BdBtYOgExkF2BCk_B3lQDs05NkuX3htV3vdfTCRyc37lO3nEMSPq7Kcv8Wgxn-y-AxTTof7-nCib1fNtpQd3T-MtUBt46XAcff0fBVUqchdyx82K_44uXoYoB9J_O0BubVLl_eyvuZIyWDeObgLkNLs1EyFBW6Ywxhk"
    },
    deliveryPoint: "Hall de Laboratorios Piso 3 (SJL)",
    campusDeliveryPoint: "Hall de Laboratorios Piso 3 (SJL)",
    status: "approved",
    alert: null,
    aiAlert: null,
    photosCount: 3,
    time: "Enviado hace 35 min",
    timeAgo: "Hace 35 min",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGRCZhu3iFADXKhMDCpHoBf9JGbBo0GhczHd1Rv-TYn8fOIFdqpw1Zmj_NNLC4P7Ls2pB4oyrXDbmek7pzeRLU4z8uNuCZjs5y1tu_k7jkvMiYRcEotm1r7j1IMueNsHtzlauQgvpw-lBuOTGt3gXpX9-fMHJHUdTUvQelfZ-r3X-iTADYGrosYp-Fu-UUTDyaF_xZtwhcoWTNqlX5TVj9sE5FOtuYSi6QJr62SKI"
  },
  {
    id: "mod-3",
    artId: "#ART-89408",
    title: "Libro de Cálculo de Varias Variables - James Stewart 8va Ed.",
    category: "libros",
    categoryLabel: "Libros",
    condition: "Nuevo / Sin tachaduras",
    price: 85.00,
    refPrice: "S/ 160.00",
    currency: "S/",
    sellerName: "Renzo Palacios Díaz",
    sellerCode: "U21203940",
    sellerFaculty: "Ing. Sistemas e Informática",
    sellerEmail: "r.palacios@utp.edu.pe",
    sellerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvrTI9UM1r3y-qZIDn1xEXX8z4SSE4i_uOwGvu-q3-isW9xapggQqFLheJn_HtaPUOJA94ITSfBSObr8W-4dHN3zSeM7fFmugKXHWDVu4A6en4iBJNfJhcfzF5w0R7O5FOy6I9yz6lOrzXW8TT8FMfOScSIj0BWhtnr980Pm2c3Jg3U7SuZ1toUmLM5G8IHGk2q1HBrxJTdklJxFInx6wOcsauV5vlFAN8NAf-ZXs",
    seller: {
      name: "Renzo Palacios Díaz",
      code: "U21203940",
      faculty: "Ing. Sistemas e Informática",
      email: "r.palacios@utp.edu.pe",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvrTI9UM1r3y-qZIDn1xEXX8z4SSE4i_uOwGvu-q3-isW9xapggQqFLheJn_HtaPUOJA94ITSfBSObr8W-4dHN3zSeM7fFmugKXHWDVu4A6en4iBJNfJhcfzF5w0R7O5FOy6I9yz6lOrzXW8TT8FMfOScSIj0BWhtnr980Pm2c3Jg3U7SuZ1toUmLM5G8IHGk2q1HBrxJTdklJxFInx6wOcsauV5vlFAN8NAf-ZXs"
    },
    deliveryPoint: "Biblioteca Central - Sala de Estudio 2 (Lima Norte)",
    campusDeliveryPoint: "Biblioteca Central - Sala de Estudio 2 (Lima Norte)",
    status: "approved",
    alert: null,
    aiAlert: null,
    photosCount: 5,
    time: "Enviado hace 1 hora",
    timeAgo: "Hace 1 hora",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf9-Pxu7tARc0xI6wKtCORCxn8IcbeA_JhHu605KPHBBlnGOu4l0gzo-iL2m8APRzlwtX77pqKC2Ab2mRUvDbs6G1g7uKRLcQI2aZMLy-AOWjyW9gGtYhz4OQ-2i2rIjwGI1PXSZeE4varTsQTbgP0XRV95ssGUeLXFIH4DhOjk4qVOyNghwtjXrJCliGDdQ1va30l1F7QuPeWO1IcTOXIKGjrz74ECjOa-tk1klE"
  },
  {
    id: "mod-4",
    artId: "#ART-89405",
    title: "Set de Estilógrafos y Regla T Rotring",
    category: "papeleria",
    categoryLabel: "Papelería",
    condition: "Usado - Buen estado",
    price: 40.00,
    refPrice: "S/ 90.00",
    currency: "S/",
    sellerName: "Mateo Rivera",
    sellerCode: "U22109841",
    sellerFaculty: "Arquitectura",
    sellerEmail: "m.rivera@utp.edu.pe",
    sellerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYAbD-sPEG21QSFJ9c-kHGZ60IjUjR7T0Qp0kfrM7kHOX4r3VyyXjSDeZpvS3Sc3ARf5_FE8xUiUW2N_4EfOCsknK49ETTO5hqa2RgbExpADhn6LwUEHHFWOL0AagAj04gsNEXhdxFzMJidlV6EWjzA7NA6yc1WUpl3zc_uIUDnIDtYLAHCP3k5U3tGlzVl_6-JPFf883iANbst9RPa1hC72BZJOSHhkSBDcM8L9ilC2tKYbxQ0jx4QA",
    seller: {
      name: "Mateo Rivera",
      code: "U22109841",
      faculty: "Arquitectura",
      email: "m.rivera@utp.edu.pe",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYAbD-sPEG21QSFJ9c-kHGZ60IjUjR7T0Qp0kfrM7kHOX4r3VyyXjSDeZpvS3Sc3ARf5_FE8xUiUW2N_4EfOCsknK49ETTO5hqa2RgbExpADhn6LwUEHHFWOL0AagAj04gsNEXhdxFzMJidlV6EWjzA7NA6yc1WUpl3zc_uIUDnIDtYLAHCP3k5U3tGlzVl_6-JPFf883iANbst9RPa1hC72BZJOSHhkSBDcM8L9ilC2tKYbxQ0jx4QA"
    },
    deliveryPoint: "Torre A - Hall de Pabellón B",
    campusDeliveryPoint: "Torre A - Hall de Pabellón B",
    status: "pending",
    alert: null,
    aiAlert: null,
    photosCount: 3,
    time: "Enviado hace 2 horas",
    timeAgo: "Hace 2 horas",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgYltquu-2hJcTr6Qq6mdmDVrwbMQ9F8MAR9zweyU1PkFsp5Rwgm-chxkLFCF4KuPVAOGjwRcDmtnz3OAAR_o8MRhaZqjCiZ6wfeMvZ3h4Xig8TjRQ6qWoks8H_Gb61HNmpZM_1oM2FfJUuWS6o7OXUhQGlk68jaUnSxsgDZfJnf5AD8gOnUUgBnelnNcGwNohsq1XwVs3gy7HGZLOF4tpFljaqunOCZJ1SIW_OKDg0bzaFMq3zAeU"
  }
];

export const INITIAL_REPORTS = [
  {
    id: "INC-1042",
    type: "disputa",
    category: "Disputa",
    title: "Producto no coincide con la descripción (Calculadora Casio fx-991EX)",
    summary: "Pantalla con falla de píxeles no reportada antes de la entrega presencial.",
    claimNarrative: "Pantalla con falla de píxeles no reportada antes de la entrega presencial.",
    buyer: { name: "Andrea Lozano", code: "U20304918", email: "a.lozano@utp.edu.pe" },
    seller: { name: "Jorge Gálvez", code: "U19302119", email: "j.galvez@utp.edu.pe" },
    productTitle: "Calculadora Casio fx-991EX",
    productCondition: "Publicado como Excelente",
    productImage: "/reportes/casio-frente.jpg",
    amount: 45.00,
    amountHeld: 45.00,
    currency: "S/",
    location: "Biblioteca Central Piso 2",
    campusPoint: "Biblioteca Central Piso 2",
    campus: "Sede Lima Centro",
    time: "Hace 2h",
    timeAgo: "Hace 2h",
    date: "24 de Octubre, 2024 • 11:20 AM",
    startDate: "24 de Octubre, 2024",
    status: "mediacion",
    statusLabel: "En Mediación",
    evidences: [
      { id: 1, label: "Foto 1: LCD Dañado", url: "/reportes/inc-1042-lcd-simulado.jpg", image: "/reportes/inc-1042-lcd-simulado.jpg", simulated: true },
      { id: 2, label: "Foto 2: Serie & Carcasa", url: "/reportes/inc-1042-carcasa-simulada.jpg", image: "/reportes/inc-1042-carcasa-simulada.jpg", simulated: true }
    ],
    messages: [
      {
        id: 1,
        sender: "buyer",
        senderRole: "buyer",
        author: "Andrea Lozano (U20304918)",
        text: "La calculadora se apaga y pierde líneas completas al resolver matrices en la clase de Álgebra. Le escribí a Jorge para devolverla pacíficamente apenas salí de clase pero no me contestó hasta que abrí este reporte.",
        time: "11:24 AM"
      },
      {
        id: 2,
        sender: "seller",
        senderRole: "seller",
        author: "Jorge Gálvez (U19302119)",
        text: "Hola Andrea, estaba rindiendo práctica calificada en Pabellón B. En la Biblioteca la encendimos juntos y funcionaba. Puede ser que requiera cambio de pila solar o botón reset, no es mala intención de mi parte.",
        time: "11:38 AM"
      },
      {
        id: 3,
        sender: "admin",
        senderRole: "admin",
        author: "Admin UTP (Moderador Oficial)",
        text: "Estimados estudiantes, hemos revisado las fotografías de evidencia y el registro de la publicación original. El artículo fue categorizado como 'Excelente estado operativo'. Dado que la falla de display compromete su uso académico, sugerimos coordinar la devolución del equipo y liberación del saldo o la revisión técnica presencial hoy en la Oficina de Bienestar Estudiantil (Torre A, Piso 1).",
        time: "12:02 PM"
      }
    ]
  },
  {
    id: "INC-1040",
    type: "entrega",
    category: "Disputa",
    title: "Vendedor no se presentó en el punto acordado (Torre A)",
    summary: "Comprador esperó 40 min para la entrega de Tablet Digitalizadora Huion.",
    claimNarrative: "Comprador esperó 40 min para la entrega de Tablet Digitalizadora Huion.",
    buyer: { name: "Mateo Rivera", code: "U22109841", email: "m.rivera@utp.edu.pe" },
    seller: { name: "Daniel Ponce", code: "U20301129", email: "d.ponce@utp.edu.pe" },
    productTitle: "Tablet Digitalizadora Huion",
    productCondition: "Nuevo en caja",
    productImage: "/reportes/tableta-huion.jpg",
    amount: 120.00,
    amountHeld: 120.00,
    currency: "S/",
    location: "Torre A - Cafetería",
    campusPoint: "Torre A - Cafetería",
    campus: "Sede Lima Centro",
    time: "Hace 4h",
    timeAgo: "Hace 4h",
    date: "24 de Octubre, 2024 • 09:15 AM",
    startDate: "24 de Octubre, 2024",
    status: "descargo",
    statusLabel: "En Descargo",
    evidences: [],
    messages: [
      {
        id: 1,
        sender: "buyer",
        senderRole: "buyer",
        author: "Mateo Rivera (U22109841)",
        text: "Llegué a las 9:15 a la cafetería Torre A, esperé hasta las 10:00 y Daniel no contestó llamadas ni mensajes. Tuve que retirarme a mi clase.",
        time: "10:15 AM"
      }
    ]
  },
  {
    id: "INC-1038",
    type: "conducta",
    category: "Prohibido",
    title: "Intento de cobro fuera de la plataforma / Precios anómalos",
    summary: "Solicitud de pagos por enlaces sospechosos ajenos al ecosistema AlToque.",
    claimNarrative: "Solicitud de pagos por enlaces sospechosos ajenos al ecosistema AlToque.",
    buyer: { name: "Carla Salinas", code: "U21204899", email: "c.salinas@utp.edu.pe" },
    seller: { name: "Cuenta bajo observación", code: "U22108849", email: "u22108849@utp.edu.pe" },
    productTitle: "Cálculo Stewart 8va Ed.",
    productCondition: "Buen estado",
    productImage: "/reportes/calculo-stewart.jpg",
    amount: 20.00,
    amountHeld: 20.00,
    currency: "S/",
    location: "Campus Virtual",
    campusPoint: "Campus Virtual",
    campus: "Sede San Juan de Lurigancho",
    time: "Ayer",
    timeAgo: "Ayer",
    date: "23 de Octubre, 2024 • 15:40 PM",
    startDate: "23 de Octubre, 2024",
    status: "revision",
    statusLabel: "En Revisión",
    evidences: [],
    messages: [
      {
        id: 1,
        sender: "buyer",
        senderRole: "buyer",
        author: "Carla Salinas",
        text: "El vendedor me envió un enlace externo de pago pidiéndome transferir por un número no registrado.",
        time: "3:42 PM"
      }
    ]
  },
  {
    id: "INC-1035",
    type: "disputa",
    category: "Disputa",
    title: "Libro en mal estado con páginas faltantes",
    summary: "Cálculo Vectorial Stewart 7ma Edición. Resuelto con reembolso pacífico.",
    claimNarrative: "Cálculo Vectorial Stewart 7ma Edición. Resuelto con reembolso pacífico.",
    buyer: { name: "Luis Méndez", code: "U19203991", email: "l.mendez@utp.edu.pe" },
    seller: { name: "Ana Silva", code: "U20108842", email: "a.silva@utp.edu.pe" },
    productTitle: "Cálculo Vectorial Stewart",
    productCondition: "Aceptable",
    productImage: "/reportes/calculo-vectorial.jpg",
    amount: 35.00,
    amountHeld: 35.00,
    currency: "S/",
    location: "Biblioteca Central",
    campusPoint: "Biblioteca Central",
    campus: "Sede Lima Norte",
    time: "Hace 2 días",
    timeAgo: "Hace 2 días",
    date: "22 de Octubre, 2024 • 14:00 PM",
    startDate: "22 de Octubre, 2024",
    status: "resolved",
    statusLabel: "Resuelto",
    evidences: [],
    messages: [
      {
        id: 1,
        sender: "admin",
        senderRole: "admin",
        author: "Admin UTP",
        text: "Caso resuelto. Ambas partes acordaron la devolución del libro en Bienestar Estudiantil y el reembolso de S/ 35.00 fue completado.",
        time: "Hace 2 días"
      }
    ]
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: "#AT-9842",
    orderId: "#AT-9842",
    seller: { name: "Jorge Gálvez", faculty: "Ing. Sistemas" },
    sellerName: "Jorge Gálvez",
    sellerFaculty: "Ing. Sistemas",
    buyer: { name: "Andrea Lozano", faculty: "Ing. Industrial" },
    buyerName: "Andrea Lozano",
    buyerFaculty: "Ing. Industrial",
    product: "Física Universitaria Sears Vol 1",
    point: "Biblioteca Central - Piso 2",
    campusPoint: "Biblioteca Central - Piso 2",
    amount: 45.00,
    amountFormatted: "S/ 45.00",
    status: "completed",
    statusLabel: "Completado"
  },
  {
    id: "#AT-9841",
    orderId: "#AT-9841",
    seller: { name: "Mateo Rivera", faculty: "Arquitectura" },
    sellerName: "Mateo Rivera",
    sellerFaculty: "Arquitectura",
    buyer: { name: "Daniel Ponce", faculty: "Diseño Digital" },
    buyerName: "Daniel Ponce",
    buyerFaculty: "Diseño Digital",
    product: "Tablet Gráfica Huion Inspiroy",
    point: "Torre A - Pabellón B (Hall)",
    campusPoint: "Torre A - Pabellón B (Hall)",
    amount: 120.00,
    amountFormatted: "S/ 120.00",
    status: "pending",
    statusLabel: "Por entregar"
  },
  {
    id: "#AT-9840",
    orderId: "#AT-9840",
    seller: { name: "Carla Salinas", faculty: "Derecho" },
    sellerName: "Carla Salinas",
    sellerFaculty: "Derecho",
    buyer: { name: "Fernando Tello", faculty: "Psicología" },
    buyerName: "Fernando Tello",
    buyerFaculty: "Psicología",
    product: "Código Civil Comentado Tomo 1",
    point: "Cafetería Central Torre A",
    campusPoint: "Cafetería Central Torre A",
    amount: 35.00,
    amountFormatted: "S/ 35.00",
    status: "completed",
    statusLabel: "Completado"
  },
  {
    id: "#AT-9839",
    orderId: "#AT-9839",
    seller: { name: "Luciana Barreto", faculty: "Medicina" },
    sellerName: "Luciana Barreto",
    sellerFaculty: "Medicina",
    buyer: { name: "Mateo Morales", faculty: "Ing. Sistemas" },
    buyerName: "Mateo Morales",
    buyerFaculty: "Ing. Sistemas",
    product: "Estetoscopio Littmann Classic III",
    point: "Hall Laboratorios Piso 3",
    campusPoint: "Hall Laboratorios Piso 3",
    amount: 210.00,
    amountFormatted: "S/ 210.00",
    status: "completed",
    statusLabel: "Completado"
  }
];

const LIMA_CENTRO_SAFE_POINTS = [
  { id: "p1", name: "Biblioteca - Piso 2", location: "Zona de Coworking • Mostrador B", desc: "Zona de Coworking • Mostrador B", totem: "Tótem #01", feature: "QR Fijo + Cámara PTZ", type: "QR Fijo + Cámara PTZ", icon: "local_library" },
  { id: "p2", name: "Patio Central Torre A", location: "Frente a Módulo de Atención", desc: "Frente a Módulo de Atención", totem: "Tótem #02", feature: "Sensor de Proximidad", type: "Sensor de Proximidad", icon: "deck" },
  { id: "p3", name: "Cafetería Nivel 1", location: "Punto de Recojo Express C-4", desc: "Punto de Recojo Express C-4", totem: "Tótem #03", feature: "Vigilancia Presencial", type: "Vigilancia Presencial", icon: "restaurant" }
];

export const INITIAL_CAMPUS_SETTINGS = {
  maxAmount: 500.00,
  tokenQrRequired: true,
  qrRequired: true,
  mediationDays: 3,
  toleranceDays: 3,
  strictUniversityEmail: true,
  nightBlockActive: true,
  activeCampusesCount: 12,
  safePointsCount: 48,
  operatingHours: "07:00 - 21:30 hrs",
  campusList: [
    {
      id: "lima-centro",
      name: "Sede Lima Centro",
      isMain: true,
      address: "Av. Arequipa 265, Cercado de Lima",
      capacity: 850,
      safePointsCount: 6,
      safePoints: LIMA_CENTRO_SAFE_POINTS,
      points: LIMA_CENTRO_SAFE_POINTS
    },
    {
      id: "lima-norte",
      name: "Sede Lima Norte",
      isMain: false,
      address: "Av. Alfredo Mendiola 6377, Los Olivos",
      capacity: 620,
      safePointsCount: 5,
      safePoints: [
        { id: "p4", name: "Explanada Pabellón A", location: "Entrada principal", desc: "Entrada principal", totem: "Tótem #04", feature: "Geocerca 25m", type: "Geocerca 25m", icon: "apartment" }
      ],
      points: [
        { id: "p4", name: "Explanada Pabellón A", location: "Entrada principal", desc: "Entrada principal", totem: "Tótem #04", feature: "Geocerca 25m", type: "Geocerca 25m", icon: "apartment" }
      ]
    },
    {
      id: "sjl",
      name: "Sede San Juan de Lurigancho",
      isMain: false,
      address: "Av. El Sol 235, SJL",
      capacity: 540,
      safePointsCount: 4,
      safePoints: [
        { id: "p5", name: "Tótem Torre Central", location: "Hall de Auditorio", desc: "Hall de Auditorio", totem: "Tótem #05", feature: "Geocerca 20m", type: "Geocerca 20m", icon: "domain" }
      ],
      points: [
        { id: "p5", name: "Tótem Torre Central", location: "Hall de Auditorio", desc: "Hall de Auditorio", totem: "Tótem #05", feature: "Geocerca 20m", type: "Geocerca 20m", icon: "domain" }
      ]
    },
    {
      id: "arequipa",
      name: "Sede Arequipa",
      isMain: false,
      address: "Av. Tacna y Arica 160",
      capacity: 480,
      safePointsCount: 4,
      safePoints: [
        { id: "p6", name: "Patio Claustro", location: "Biblioteca Sala 1", desc: "Biblioteca Sala 1", totem: "Tótem #06", feature: "Geocerca 30m", type: "Geocerca 30m", icon: "location_city" }
      ],
      points: [
        { id: "p6", name: "Patio Claustro", location: "Biblioteca Sala 1", desc: "Biblioteca Sala 1", totem: "Tótem #06", feature: "Geocerca 30m", type: "Geocerca 30m", icon: "location_city" }
      ]
    }
  ],
  campuses: [
    {
      id: "lima-centro",
      name: "Sede Lima Centro",
      isMain: true,
      address: "Av. Arequipa 265, Cercado de Lima",
      capacity: 850,
      safePointsCount: 6,
      points: LIMA_CENTRO_SAFE_POINTS,
      safePoints: LIMA_CENTRO_SAFE_POINTS
    },
    {
      id: "lima-norte",
      name: "Sede Lima Norte",
      isMain: false,
      address: "Av. Alfredo Mendiola 6377, Los Olivos",
      capacity: 620,
      safePointsCount: 5,
      points: [
        { id: "p4", name: "Explanada Pabellón A", desc: "Entrada principal", totem: "Tótem #04", type: "Geocerca 25m", icon: "apartment" }
      ],
      safePoints: [
        { id: "p4", name: "Explanada Pabellón A", desc: "Entrada principal", totem: "Tótem #04", type: "Geocerca 25m", icon: "apartment" }
      ]
    },
    {
      id: "sjl",
      name: "Sede San Juan de Lurigancho",
      isMain: false,
      address: "Av. El Sol 235, SJL",
      capacity: 540,
      safePointsCount: 4,
      points: [
        { id: "p5", name: "Tótem Torre Central", desc: "Hall de Auditorio", totem: "Tótem #05", type: "Geocerca 20m", icon: "domain" }
      ],
      safePoints: [
        { id: "p5", name: "Tótem Torre Central", desc: "Hall de Auditorio", totem: "Tótem #05", type: "Geocerca 20m", icon: "domain" }
      ]
    },
    {
      id: "arequipa",
      name: "Sede Arequipa",
      isMain: false,
      address: "Av. Tacna y Arica 160",
      capacity: 480,
      safePointsCount: 4,
      points: [
        { id: "p6", name: "Patio Claustro", desc: "Biblioteca Sala 1", totem: "Tótem #06", type: "Geocerca 30m", icon: "location_city" }
      ],
      safePoints: [
        { id: "p6", name: "Patio Claustro", desc: "Biblioteca Sala 1", totem: "Tótem #06", type: "Geocerca 30m", icon: "location_city" }
      ]
    }
  ]
};
