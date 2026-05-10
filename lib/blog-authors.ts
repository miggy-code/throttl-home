export type BlogAuthor = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
};

export const blogAuthors: Record<string, BlogAuthor> = {
  miguel: {
    id: "miguel",
    name: "Miguel",
    role: "Throttl",
    avatar: "/media/profile-media/miguel_prof.jpg",
  },
  gabriel: {
    id: "gabriel",
    name: "Gabriel",
    role: "Throttl",
    avatar: "/media/profile-media/gabriel_prof.jpg",
  },
};
