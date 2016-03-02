import { REQUEST_FULL_INFO, RECEIVE_FULL_INFO } from '../actions';

const brief = (state = {}, action) => {
  switch (action.type) {
  case REQUEST_FULL_INFO:
    return state;
  case RECEIVE_FULL_INFO: {
    const { athlete, statistic } = action.data;
    return {
      username: `${athlete.firstName} ${athlete.lastName}`,
      country: athlete.country,
      bio: athlete.bio,
      statisticToday: statistic.today,
      statisticWeek: statistic.week,
      statisticMonth: statistic.month,
      statisticYear: statistic.year,
      statisticTotal: statistic.total
    };
  } default:
    return state;
  }
};

export default brief;
