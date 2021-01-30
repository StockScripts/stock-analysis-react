import React from 'react';
import {
  faMoneyCheckAlt,
  faHandHoldingUsd,
  faMoneyBillWave,
  faFunnelDollar,
  faFileInvoiceDollar,
  faFileInvoice,
  faCoins,
  faCreditCard,
  faBalanceScale
} from '@fortawesome/free-solid-svg-icons'
import { ChecklistItem } from './checklistItem'

export default function Home() {
  // style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)
  return (
    <>
      <div className="py-20 bg-palette-green-med">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-2 text-palette-light">
            Invest in good companies
          </h2>
          {/* <h3 className="text-2xl mb-8 text-palette-light"> */}
          <h3 className="text-2xl text-palette-light">
            A simple way to find good investments. Just look for the green.
          </h3>
          {/* <div>
            <h3 className="text-xl font-semibold text-palette-light hover:underline">
              <a href="https://blog.grasshopperstocks.com/2020/12/18/how-do-i-find-a-good-company-to-invest-in/">Tell me more</a>
            </h3>
          </div> */}
        </div>
      </div>

      <section className=" bg-white mx-auto px-10 p-10">
        {/* <div className="container max-w-5xl mx-auto m-8"> */}
          <h1 className="w-full my-2 mb-8 text-4xl font-bold leading-tight text-center text-gray-600">How do I use this?</h1>
        
          <div className="flex flex-wrap sm:flex-row ">
            <div className="w-full sm:w-1/2 p-6 mt-24">
              <h3 className="text-2xl text-gray-600 font-bold leading-none mb-3">Find a stock you're interested in</h3>
              <p className="text-gray-600 mb-8">
                Don't know what to invest in? Start with companies you already use. Enter the ticker symbol or company name.
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <div className="shadow-xl">
                <img className="w-full ml-auto rounded-sm shadow-lg" alt='demo' src={require('./enter-ticker.gif')} />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap flex-col-reverse sm:flex-row">	
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <div className="shadow-xl">
                <img className="w-full ml-auto rounded-sm" alt='demo' src={require('./report.gif')} />
              </div>
              {/* <svg className="w-5/6 sm:h-64 mx-auto" viewBox="0 0 1176.60617 873.97852" xmlns="http://www.w3.org/2000/svg"> */}
            </div>
            <div className="w-full sm:w-1/2 p-6 mt-24">
              <div className="align-middle">
                <h3 className="text-2xl text-gray-600 font-bold leading-none mb-3">Look for the Green</h3>
                <p className="text-gray-600 mb-8">
                  The company financials are evaluated for characteristics of a successful company. It shows a green icon if
                  it meets a requirement and orange if it doesn't. Orange doesn't necessarily mean
                  it's bad, but you may need to look into it and use your own discretion.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-row">
            <div className="w-full sm:w-1/2 p-6 mt-24 text-right">
              <h3 className="text-2xl text-gray-600 font-bold leading-none mb-3">Be informed</h3>
              <p className="text-gray-600 mb-8">
                Click on the icon to learn more about the item. You'll get information on what it is, why it's important,
                and what to watch for.
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <div className="shadow-2xl">
                <img className="w-full ml-auto rounded-sm" alt='demo' src={require('./icon-click.gif')} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap flex-col-reverse sm:flex-row">	
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <div className="shadow-xl">
                <img className="w-full ml-auto rounded-sm" alt='demo' src={require('./graph.gif')} />
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-6 mt-24">
              <div className="align-middle">
                <h3 className="text-2xl text-gray-600 font-bold leading-none mb-3">Examine data</h3>
                <p className="text-gray-600 mb-8">
                  View data in table form and hover over the graph to view the numbers. Focus on specific data by clicking
                  on the graph legends.
                </p>
              </div>
            </div>
          </div>
        {/* </div> */}
      </section>

      <section className="container mx-auto px-6 p-10">
        <div className="text-center text-palette-green-med mb-8">
          <h2 className="text-4xl font-bold">
            <a className="cursor-default" href="#what-to-look-for">What should you look for in a stock?</a>
          </h2>
          <p className="text-2xl">Let's make this simple. You are the company. What would make you financially successful?</p>
        </div>

        <div className="flex-1 bg-palette-light pb-24 md:pb-5">
          <div className="flex flex-row flex-wrap flex-grow mt-2">
            <ChecklistItem
              title="Are you getting a raise every year?"
              subtitle="Revenue"
              link="https://www.investopedia.com/terms/r/revenue.asp"
              icon={faMoneyCheckAlt}
              content="Revenue or sales is how much a company is getting paid. Just like how you should be getting a
                raise at your job every year, a company should be growing their sales every year."
            />
            <ChecklistItem
              title="Can you manange your money?"
              subtitle="ROE"
              link="https://www.investopedia.com/terms/r/returnonequity.asp"
              icon={faHandHoldingUsd}
              content="Are you using your money wisely? Are you squandering it? ROE tells you how effective a company is at using shareholder money."
            />
            <ChecklistItem
              title="How much do you spend to make money?"
              subtitle="Gross Profit"
              link="https://www.investopedia.com/terms/g/grossprofit.asp"
              icon={faCoins}
              content="In order to do your job, you have basic necessities. Gas to get to work, training courses, maybe some nice work clothes.
                This should cost less than what you're making. For a company, this is the cost of making their product. The more
                profit they keep, the better."
            />
            <ChecklistItem
              title="How much bills do you have?"
              subtitle="SGA"
              link="https://www.investopedia.com/terms/s/sga.asp"
              icon={faFileInvoice}
              content="This is the general administrative expenses for a company. It's the cost of things like salary, advertising,
              and office supplies. For you, it's the utility bills, gas, rent, etc. The cost for these items should be manageable."
            />
            <ChecklistItem
              title="Are you keeping the money you're making?"
              subtitle="Net Income"
              link="https://www.investopedia.com/terms/n/net_margin.asp"
              icon={faFunnelDollar}
              content="You make money, and you use money. You pay bills, taxes, buy groceries, go out to eat, and buy toys.
                The money you have left over is your net income. The more of it you have, the better."
            />
            <ChecklistItem
              title="Do you have spending money?"
              subtitle="Free Cash Flow"
              link="https://www.investopedia.com/terms/f/freecashflow.asp"
              icon={faMoneyBillWave}
              content={`This is the actual cash you have on hand after you pay your credit card bills, groceries, and other expenses.
                It's money you can use for the fun stuff. You should have "fun money", and so should a company.`}
            />
            <ChecklistItem
              title="Can you pay your bills?"
              subtitle="Liquidity and Current Ratio"
              link="https://www.investopedia.com/terms/c/currentratio.asp"
              icon={faFileInvoiceDollar}
              content="You should have enough cash to pay your bills every month. No borrowing from credit cards or having to sell your Funko Pop collection.
                A company has the same responsibilities."
            />
            <ChecklistItem
                title="Can you afford your debt?"
                subtitle="Long Term Debt"
                link="https://www.investopedia.com/terms/l/longtermdebt.asp"
                icon={faCreditCard}
                content="You might have a mortgage or installments on a ridiculously expensive lifesized stormtrooper.
                  You should have enough income to be able to someday pay it off at a reasonable amount of time. The same goes for a company."
              />
            <ChecklistItem
              title="Do you owe too much?"
              subtitle="Leverage"
              link="https://www.investopedia.com/terms/l/leverageratio.asp"
              icon={faBalanceScale}
              content="This is what you owe vs. what you own. Hint: You should not owe way more than you own, and neither should a company."
            />

          </div>
        </div>
      </section>

      {/* <footer className="bg-white">
        <div className="container mx-auto  px-8">

            <div className="text-gray-600">Data provided by <a href="https://iexcloud.io">IEX Cloud</a></div>
              <div className="w-full flex flex-col md:flex-row py-6">
              
            <div className="flex-1 mb-6">
            
              <a className="text-orange-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"  href="/"> 
                <svg className="h-8 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005">
                </svg> PixyStocks
              </a>
            </div>
          
                  <div className="flex-1">
                      <p className="uppercase text-gray-500 md:mb-6">Links</p>
                      <ul className="list-reset mb-6">
                          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                              <a href="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">FAQ</a>
                          </li>
                          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                              <a href="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">Help</a>
                          </li>
                          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                              <a href="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">Support</a>
                          </li>
                      </ul>
                  </div>
                  <div className="flex-1">
                      <p className="uppercase text-gray-500 md:mb-6">Legal</p>
                      <ul className="list-reset mb-6">
                          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                              <a href="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">Terms</a>
                          </li>
                          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                              <a href="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">Privacy</a>
                          </li>
                      </ul>
                  </div>
                  <div className="flex-1">
                      <p className="uppercase text-gray-500 md:mb-6">Social</p>
                      <ul className="list-reset mb-6">
                          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                              <a href="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">Facebook</a>
                          </li>
                          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                              <a href="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">Linkedin</a>
                          </li>
                          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                              <a href="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">Twitter</a>
                          </li>
                      </ul>
                  </div>
                  <div className="flex-1">
                      <p className="uppercase text-gray-500 md:mb-6">Company</p>
                      <ul className="list-reset mb-6">
                          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                              <a href="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">Official Blog</a>
                          </li>
                          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                              <a href="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">About Us</a>
                          </li>
                          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                              <a href="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">Contact</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </footer> */}
    </>
  )
}
