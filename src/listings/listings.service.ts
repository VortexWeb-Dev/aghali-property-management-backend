import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
  ) {}

  create(createListingDto: CreateListingDto) {
    const listing = this.listingRepository.create(createListingDto);
    return this.listingRepository.save(listing);
  }

  findAll() {
    return this.listingRepository.find();
  }

  findOne(id: number) {
    return this.listingRepository.findOne({
      where: { id },
      relations: ['property', 'listedBy'],
    });
  }

  update(id: number, updateListingDto: UpdateListingDto) {
    return this.listingRepository.update(id, updateListingDto);
  }

  remove(id: number) {
    return this.listingRepository.delete(id);
  }
}
