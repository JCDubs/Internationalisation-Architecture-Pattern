import {AddressDTO as orignal} from '../../global/dto/address-dto';

export interface AddressDTO extends Omit<orignal, 'state' | 'zipcode'> {
    county: string;
    postcode: string;
}