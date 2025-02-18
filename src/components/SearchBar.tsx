import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = ({ searchQuery, onSearchChange }: { searchQuery: string; onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input 
                type="search" 
                placeholder="Busca opciones" 
                className="rounded-3xl"
                value={searchQuery}
                onChange={onSearchChange}
            />
            <Button type="submit" size="sm" className="rounded-full">
                <Search />
            </Button>
        </div>
    );
};

export default SearchBar;
