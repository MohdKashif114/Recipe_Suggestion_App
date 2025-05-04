import RecipeCard from "./RecipeCard"

interface post {
    RecipeId:number;
    RecipeName: string;
    ImageUrl: string;
    RecipeInstruction: string;
    RecipeDescription:string;
  }
  interface posts {
    recipes:post[];
  }
  export default function Cards({ recipes }: posts) {
    return (
      <div className="max-w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-darkGreen mx-auto min-h-screen">
        {recipes.map((recipe: post, key) => {
          return <RecipeCard {...recipe} key={key} />;
        })}
      </div>
    );
  }
  