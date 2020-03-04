exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1,
          user_id:1,
          title:'How do I play this game?',
          post: `This Path of Exile game is super difficult I can't even figure out how to beat the first boss!`,
          subreddit:'pathofexile',
        },
        {
          id: 2,
          user_id:1,
          title:'Having kids is hard!',
          post: 'No, but seriously, I have two little girls, a 6-year-old, and almost 4, and I never get enough sleep. I think I might die.',
          subreddit:'',
        },
        {
          id: 3,
          user_id:2,
          title:'What is your favorite color?',
          post: '',
          subreddit:'askreddit',
        },
        {
          id: 4,
          user_id:3,
          title:'Not sure how to title this',
          post: 'Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?',
          subreddit:'',
        },
        {
          id: 5,
          user_id:2,
          title:'What is your quest?',
          post: '',
          subreddit:'askreddit',
        },
      ]);
    });
};
