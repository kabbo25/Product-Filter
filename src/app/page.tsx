"use client"
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {ChevronDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {QueryResult} from "@upstash/vector";
import {Product} from "@/db";

const SORT_OPTIONS = [
    {name: 'None', value: 'none'},
    {name: 'Price: Low to High', value: 'price-asc'},
    {name: 'Price: High to High', value: 'price-desc'},
] as const
export default function Home() {
    const [filter, setFilter] = useState({
        sort: 'none'
    })
    const {data: Products} = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const {data} = await axios.post<QueryResult<Product>[]>(
                'http://localhost:3000/api/products', {
                    filter: {
                        sort: filter.sort
                    }
                }
            )
			return data
        }
    })
	console.log(Products)
    return (
        <main className={"mx-auto max-w-7xl px-4 sm:px-4 lg:px-8"}>
            <div
                className={
                    "flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24 "
                }
            >
                <h1 className={"text-4xl font-bold tracking-tight text-gray-900"}>
                    High-quality cotton selection
                </h1>
                <div className={"flex items-center"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={
                                "group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                            }
                        >
                            Sort
                            <ChevronDown
                                className={
                                    "-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-gray-500"
                                }
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={'end'} className={'w-48'}>
                            {SORT_OPTIONS.map((option) => (
                                <Button
                                    variant={'ghost'}
                                    key={option.name}
                                    className={cn('text-left w-full block px-4 py-2 text-sm ', {
                                        "text-gray-900 bg-gray-100 font-bold": option.value == filter.sort
                                    })}
                                    onClick={() => {
                                        setFilter((prev) => ({
                                            ...prev,
                                            sort: option.value
                                        }))
                                    }}
                                >
                                    {option.value}
                                </Button>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </main>
    );
}
