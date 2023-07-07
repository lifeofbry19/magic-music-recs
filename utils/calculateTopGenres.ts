type Artists =
  | {
      genres: string[];
    }[]
  | null;

export function calculateTopGenres(artists: Artists) {
  // artists will each have a genres array
  // we want to count the number of times each genre appears
  // and return the top 5 genres
  const genres: any = {};
  artists?.forEach((artist) => {
    artist.genres.forEach((genre: string) => {
      if (genres[genre]) {
        genres[genre] += 1;
      } else {
        genres[genre] = 1;
      }
    });
  });
  const topGenres = Object.entries(genres)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // convert topGenres to an array of objects with name and count
  //   const topGenresWithCount = topGenres.map((genre) => {
  //     return {
  //       name: genre[0],
  //       count: genre[1],
  //     };
  //   });

  const sum = topGenres.reduce((acc, curr) => acc + curr[1], 0);
  const topGenresWithPercentages = topGenres.map((genre) => {
    return {
      name: genre[0],
      percentage: Math.round((genre[1] / sum) * 100),
    };
  });
  return topGenresWithPercentages;
}
