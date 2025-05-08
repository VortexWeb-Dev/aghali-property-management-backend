import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    try {
      const booking = this.bookingRepository.create(createBookingDto);
      await this.bookingRepository.save(booking);
      this.logger.log(`Booking record created: ${booking.id}`);
      return booking;
    } catch (error) {
      this.logger.error(`Error creating booking record: ${error.message}`);
      throw error;
    }
  }

  async findAll() {
    try {
      const bookings = await this.bookingRepository.find();
      if (!bookings.length) {
        this.logger.warn('No booking records found');
      }
      return bookings;
    } catch (error) {
      this.logger.error(`Error fetching booking records: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { id },
        relations: ['property', 'tenant'],
      });
      if (!booking) {
        throw new NotFoundException(`Booking record with ID ${id} not found`);
      }
      return booking;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
      } else {
        this.logger.error(
          `Error fetching booking record with ID ${id}: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    try {
      const result = await this.bookingRepository.update(id, updateBookingDto);
      if (result.affected === 0) {
        throw new NotFoundException(`Booking record with ID ${id} not found`);
      }
      this.logger.log(`Booking record with ID ${id} updated`);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
      } else {
        this.logger.error(
          `Error updating booking record with ID ${id}: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.bookingRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Booking record with ID ${id} not found`);
      }
      this.logger.log(`Booking record with ID ${id} removed`);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
      } else {
        this.logger.error(
          `Error removing booking record with ID ${id}: ${error.message}`,
        );
      }
      throw error;
    }
  }
}
