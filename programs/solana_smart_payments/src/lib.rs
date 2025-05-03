#![allow(unexpected_cfgs)] // Suppress warnings for unexpected cfg conditions

use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction; // Updated import

declare_id!("24YyHYkcABsHEAbYxHtM1JaBzkm4KPdWKLbd1RupRfWh");

#[program]
pub mod solana_smart_payments {
    use super::*;

    pub fn send_payment(ctx: Context<SendPayment>, amount: u64) -> Result<()> {
        let from = &ctx.accounts.from;
        let to = &ctx.accounts.to;
        let system_program = &ctx.accounts.system_program;

        let ix = system_instruction::transfer( // Updated usage
            &from.key(),
            &to.key(),
            amount,
        );

        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                from.to_account_info(),
                to.to_account_info(),
                system_program.to_account_info(),
            ],
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SendPayment<'info> {
    #[account(mut)]
    pub from: Signer<'info>,
    /// CHECK: This is safe because we are just transferring lamports
    #[account(mut)]
    pub to: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}
