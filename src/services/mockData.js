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
