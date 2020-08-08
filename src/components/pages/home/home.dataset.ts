export default {
  data: {
    temp: 0,
    offer: 30,
    demand: 40,
    tab: 'employer',
  },
  props: { },
  axios: {
    forecast: {
      list: [
        {
          main: {
            temp: 305.56,
          },
        },
      ],
      city: {
        name: 'London',
      },
    },
  },
}
