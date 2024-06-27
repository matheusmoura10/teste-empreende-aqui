import BankAccountCreateDto from 'src/@core/application/dto/bank-account/bank-account.create.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { BankAccountService } from './bank-account.service';
import DepositAccountDto from 'src/@core/application/dto/bank-account/deposit.account.dto';
import WithdrawAccountDto from 'src/@core/application/dto/bank-account/withdraw.account.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('Bank Account')
@ApiBearerAuth()
@Controller('bank-account')
export class BankAccountController {

    constructor(
        private readonly bankAccountService: BankAccountService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new bank account' })
    @ApiResponse({ status: 201, description: 'Bank account created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async create(@Body() bank: BankAccountCreateDto) {
        return await this.bankAccountService.create(bank);
    }

    @Get()
    @ApiOperation({ summary: 'Get my bank accounts' })
    @ApiResponse({ status: 200, description: 'Bank accounts found' })
    async getMyAccounts() {
        return await this.bankAccountService.getMyAccounts();
    }

    @Post('deposit')
    @ApiOperation({ summary: 'Deposit in a bank account' })
    @ApiResponse({ status: 201, description: 'Deposit created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async deposit(@Body() bank: DepositAccountDto) {
        return await this.bankAccountService.deposit(bank);
    }

    @Post('withdraw')
    @ApiOperation({ summary: 'Withdraw from a bank account' })
    @ApiResponse({ status: 201, description: 'Withdraw created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Account not found' })
    @ApiResponse({ status: 406, description: 'Insufficient funds' })
    async withdraw(@Body() bank: WithdrawAccountDto) {
        return await this.bankAccountService.withdraw(bank);
    }
}
