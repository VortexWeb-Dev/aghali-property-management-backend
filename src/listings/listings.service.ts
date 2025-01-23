import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { Property } from 'src/properties/entities/property.entity';
import { Contact } from 'src/contacts/entities/contact.entity';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  // Create a new listing
  async create(createListingDto: CreateListingDto) {
    const { propertyId, listedById } = createListingDto;

    const property = await this.propertyRepository.findOneBy({
      id: propertyId,
    });
    if (!property) {
      throw new NotFoundException(`Property with ID ${propertyId} not found`);
    }

    const listedBy = await this.contactRepository.findOneBy({ id: listedById });
    if (!listedBy) {
      throw new NotFoundException(`Contact with ID ${listedById} not found`);
    }

    const listing = this.listingRepository.create({
      ...createListingDto,
      property,
      listedBy,
    });

    return this.listingRepository.save(listing);
  }

  // Get all listings (with optional filtering, pagination, and sorting)
  async findAll(page: number = 1, limit: number = 10, status?: string) {
    const query = this.listingRepository.createQueryBuilder('listing');

    if (status) {
      query.andWhere('listing.listingStatus = :status', { status });
    }

    query.skip((page - 1) * limit).take(limit);
    return query.getManyAndCount(); // Returns both listings and total count for pagination
  }

  // Get a single listing by ID
  async findOne(id: number) {
    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: ['property', 'listedBy'],
    });

    if (!listing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    return listing;
  }

  // Update an existing listing
  async update(id: number, updateListingDto: UpdateListingDto) {
    const listing = await this.listingRepository.preload({
      id,
      ...updateListingDto,
    });

    if (!listing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    return this.listingRepository.save(listing);
  }

  // Remove a listing by ID
  async remove(id: number) {
    const listing = await this.findOne(id); // Ensure listing exists before deleting
    return this.listingRepository.remove(listing);
  }
}
