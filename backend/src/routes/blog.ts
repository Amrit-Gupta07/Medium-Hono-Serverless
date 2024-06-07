import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createdBlogInput,updateBlogInput } from "@amrit07/medium-common";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables:{
    userId: string,
  }
}>();

blogRouter.use("/*", async(c, next) => {
    const authHeader = c.req.header("authorization") || "";
    const decoded_token = await verify(authHeader, c.env.JWT_SECRET);

try {
        if(decoded_token){
            //@ts-ignore
            c.set("userId" ,decoded_token.id);
            await next();
        }
    
        else{
            c.status(403);
            return c.json({
                message : "User Not logged in"
            })
        }
} catch (error) {
    c.status(403);
    return c.json({
        message : "User Not logged in"
    })
}

    next();
});

blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const {success} = createdBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Post input are incorrect"
        })
    }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());


  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userId")
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {
    const body = await c.req.json();

    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Update post input are incorrect"
        })
    }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());


  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

      const blogs = await prisma.post.findMany();

      return c.json({
        blogs
      })
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const id =  c.req.param("id");

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id
      },
    });

    return c.json({
      blog,
    });
  } catch (error) {
        c.status(411)
        return c.json({
            message : "Error while fetching blog post"
        })
  }
});

