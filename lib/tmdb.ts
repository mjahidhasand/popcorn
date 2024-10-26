export const getTMDBImgURL = (img: string) => {
  const baseURL = process.env.NEXT_PUBLIC_TMDB_BASE_IMAGE;
  return baseURL + img;
};
