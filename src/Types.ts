export interface User {
    id: string;
    name: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }
  
  export interface Post {
    id: string;
    title: string;
    body: string;
    user: {
      name: string;
    };
    comments: Array<{
      id: string;
      body: string;
      email: string;
    }>;
  }
  
  export interface UserProfileData {
    user: User;
  }
  
  export interface PostDetailsData {
    post: Post;
  }
  