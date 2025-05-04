import { useAuth } from "@/authcontext/Authcontext";
import { MdOutlineRefresh } from "react-icons/md";

export default function SearchBar() {
  const auth = useAuth();

  const putinbasket = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,
    ingredient: string
  ): void => {
    event.preventDefault();
    if (!auth.cbingredients.includes(ingredient)) {
      auth.setcbIngredients([...auth.cbingredients, ingredient]);
    }
    auth.setInputval("");
    console.log(auth.cbingredients);
  };

  const handlekeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      putinbasket(event, auth.inputval);
    }
  };

  const handlecheckbox = (ingredient: string) => {
    const filteredIng = auth.cbingredients.filter((el) => el !== ingredient);
    auth.setcbIngredients(filteredIng);
  };

  const handleRecipe = () => {
    auth.setIng([...auth.cbingredients]);
    console.log("set ingredients in handleRecipe", auth.cbingredients);
    auth.setloading(true);
  };

  return (
    <div className="py-6 w-1/2 sm:w-xl gap-2 flex justify-around flex-col">
      <div className="flex justify-around flex-row items-center border-2 rounded-md">
        <input
          className="border-0 w-11/12 h-10 rounded-md rounded-r-none p-2 text-xs sm:text-sm"
          type="text"
          id="ingredient"
          placeholder="What's in your fridge?"
          value={auth.inputval}
          onChange={(e) => auth.setInputval(e.target.value)}
          onKeyDown={handlekeydown}
        />
        <button
          className="bg-[#3E7B27] h-10 rounded-l-none rounded-sm text-sm leading-none cursor-pointer"
          onClick={(event) => putinbasket(event, auth.inputval)}
        >
          Add to basket
        </button>
      </div>
      <div className="flex gap-2 flex-row overflow-x-auto max-w-full py-2">
        {auth.cbingredients.map((ingredient, key) => (
          <label key={key} className="p-1 border-2 rounded-md whitespace-nowrap">
            <input
              type="checkbox"
              className="w-4 m-1"
              checked={auth.cbingredients.includes(ingredient)}
              onChange={() => handlecheckbox(ingredient)}
            />
            {ingredient}
          </label>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <button onClick={handleRecipe} className="bg-[#3E7B27] rounded-md w-32 h-10 border-2 cursor-pointer">
          Show Recipes
        </button>
        <button
          onClick={handleRecipe}
          className="bg-gray-400 rounded-md w-10 h-10 border-2 flex justify-center items-center text-2xl cursor-pointer"
        >
          <MdOutlineRefresh />
        </button>
      </div>
    </div>
  );
}
