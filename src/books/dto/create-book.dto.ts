import { IsNotEmpty, IsNumber, IsString, Matches, IsIn, IsPositive, IsISBN } from "class-validator";
import { Transform } from "class-transformer";
import { SUPPORTED_COUNTRIES } from "../../common/constants/countries.constant.js";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?:\d{10}|\d{13})$/, {
        message: 'ISBN must be 10 or 13 digits'
    })
    @Transform(({ value }) => {
        return typeof value === 'string' ? value.replace(/-/g, '') : value;
    })
    isbn: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    cost_usd: number;

    @IsNumber()
    @IsNotEmpty()
    stock_quantity: number;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(SUPPORTED_COUNTRIES)
    supplier_country: string;
}
