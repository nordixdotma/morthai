"use client"

import { Container } from "@/components/ui/container"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import PageHeroSection from "@/components/page-hero-section"

export default function ConditionsPage() {
  const sections = [
    {
      title: "DEFINITIONS",
      content: `
        <p className="mb-4"><strong>Beneficiary:</strong> designates the person using the Gift or Treatment Voucher.</p>
        
        <p className="mb-4"><strong>Gift Voucher:</strong> designates the document containing the offer, the location, the validity date, the name of the beneficiary and the description allowing you to take advantage of an offer within an establishment. The Gift Voucher can be delivered by collection on site or digitally.</p>
        
        <p className="mb-4"><strong>Customer:</strong> designates the person who purchases a Gift or treatment Voucher, it being understood that the Customer may or may not be the Beneficiary of the service depending on whether he or she will make personal use of the Voucher Gift or that the Gift Voucher is intended for the use of another Beneficiary.</p>
        
        <p className="mb-4"><strong>Personal data:</strong> refers to any information, of whatever nature and regardless of its medium, including sound and image, concerning an identified or identifiable natural person.</p>
        
        <p className="mb-4"><strong>Establishment:</strong> designates the company issuing the Gift Voucher which ensures collections, invoicing, delivery monitoring, compliance of the service and all obligations relating to the offer.</p>
        
        <p className="mb-4"><strong>Service:</strong> designates the entire offer or care provided by the establishment to the Beneficiary. This is the service provided by the establishment.</p>
        
        <p><strong>Website:</strong> refers to the Site https://en.morthai-marrakech.com</p>
      `
    },
    {
      title: "GENERAL CONDITIONS OF SALE (CGV)",
      content: `
        <p className="mb-4">The Establishment offers online Gift Vouchers to order with payment obligation, as well as SPA treatments developed under the URL https://en.morthai-marrakech.com, SHIVAGO-MOR THAI SPA, limited company, with share capital of: 10,000 MAD, whose head office is located at No.52 Immeuble Le Noyer B, Rue Ibn Sina Nourri Atlassi, Gueliz Marrakech, Morocco, registered with the RCS Marrakech under number 72087.</p>
        
        <p>The Client is invited to carefully read the entire of these General Conditions of Sale (CGV) which define the terms and conditions under which the sale of Gift Vouchers is carried out by Mor Thai Marrakech.</p>
      `
    },
    {
      title: "APPLICATION AND ENFORCEMENT",
      content: `
        <p className="mb-4">Any order placed by the Customer implies its unreserved acceptance and full acceptance of these General Terms and Conditions.</p>
        
        <p className="mb-4">The Customer thus acknowledges having read the General Terms and Conditions prior to ordering.</p>
        
        <p className="mb-4">These General Conditions of Sale therefore only apply to orders for Gift Vouchers placed on the Site https://en.morthai-marrakech.com, or directly by telephone: +212(0)524207055, or upon receipt of the establishment.</p>
        
        <p className="mb-4">Mor Thai Marrakech reserves the right to modify these General Terms and Conditions at any time. In this case, the new conditions will apply to any new order, as well as to all ongoing operations, from the date they are brought to the Customer's attention by any means.</p>
        
        <p className="mb-4">These General Conditions of Sale are valid from 07/27/2020. They cancel and replace as of this date, all previous versions of these conditions.</p>
        
        <p className="mb-4">The Customer declares to have the legal capacity in accordance with article 03 et seq. of the Dahir forming the Code of Obligations and Contracts to contract and use the Site in accordance with the General Conditions of Sale and use of the Site.</p>
      `
    },
    {
      title: "FORMATION OF THE CONTRACT AND ORDER PLACEMENT PROCESS",
      content: `
        <p className="mb-4">The Customer places orders for Gift Vouchers or reserves directly:</p>
        
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>By Internet on the Website: https://en.morthai-marrakech.com</li>
          <li>By telephone: +212(0)524207055</li>
          <li>From the establishment</li>
        </ul>
        
        <p className="mb-4"><strong>The procedure for placing orders on the Site includes the following steps:</strong></p>
        
        <ul className="list-disc list-inside space-y-2">
          <li>Selection on the Site of one or more Gift Vouchers added to the Purchase</li>
          <li>Following this selection, display of a summary listing all the choices and the total price of the selected Gift Vouchers or Reservations</li>
          <li>Enter the Beneficiary on the Gift Voucher, then enter a possible personalized message</li>
          <li>Selection of delivery method and delivery address</li>
          <li>Display of a summary of the purchase allowing the Customer to check the details of his order and thus to make the modifications he deems useful, to choose his means of payment, and to confirm his order by accepting these General Terms and Conditions</li>
          <li>Registration of the Customer's order after its last validation, i.e. after the "confirm" click</li>
          <li>Validation of payment by the customer by bank card via a secure interface generated by CMI. Once payment has been validated, the order is final and an order confirmation email summarizing all the elements relating to it will be sent to the Customer</li>
          <li>After confirmation of their order, the Customer will receive a confirmation email with a summary of the treatments purchased or reserved</li>
        </ul>
      `
    },
    {
      title: "CONDITIONS OF USE OF GIFT VOUCHERS",
      content: `
        <p className="mb-4">In the event that the Customer is not a Beneficiary of the Gift Voucher, the Customer is invited to bring to the attention of the Beneficiary the conditions set out below.</p>
        
        <p className="mb-4"><strong>Validity:</strong> The Gift Voucher will be valid for one year from the date of purchase. If the Gift Voucher has not been used during the validity period, Mor Thai Marrakech will not provide any refund.</p>
        
        <p className="mb-4"><strong>Presentation:</strong> Only presentation of the original Gift Voucher or received by post or printed from email entitles you to a service.</p>
        
        <p className="mb-4"><strong>Availability:</strong> The Gift Voucher can be used by the beneficiary or customer subject to availability depending on reservations by Mor Thai Marrakech.</p>
        
        <p className="mb-4"><strong>Transport:</strong> The Customer acknowledges that the Gift Voucher services do not include transport to the location of the service at the selected establishment.</p>
        
        <p><strong>Photography:</strong> The photographs presented in the Gift Voucher are not contractual. Any partial or complete reproduction is prohibited and may give rise to legal proceedings.</p>
      `
    },
    {
      title: "OBLIGATIONS OF THE ESTABLISHMENT",
      content: `
        <p>Mor Thai Marrakech declares that it holds professional civil liability insurance relating to the provision of services and possesses all authorizations and accreditations allowing it to carry out its activities regularly and in compliance with the applicable legal and regulatory provisions.</p>
      `
    },
    {
      title: "PRICES AND PAYMENT CONDITIONS",
      content: `
        <p className="mb-4"><strong>Payment Method:</strong> Payment for the order can be made by credit card depending on the choice of cards offered on the payment method page by indicating directly in the area provided for this purpose: the card number, its validity date, as well as its code control located on the back of the card.</p>
        
        <p className="mb-4"><strong>Billing:</strong> The entire amount of the order will be debited from the bank card on the day of the order.</p>
        
        <p className="mb-4"><strong>Order Processing:</strong> Mor Thai Marrakech reserves the right to suspend any processing of the order in the event of non-payment or refusal of payment authorization from your bank.</p>
        
        <p>The Site allows the Customer to transmit their bank details in a confidential and secure manner, when ordering (secure entry by SSL encryption) through the CMI service.</p>
      `
    },
    {
      title: "PROOF OF ORDERS / ARCHIVING",
      content: `
        <p className="mb-4">The Customer is expressly informed that, unless there is a manifest error for which he must provide proof, the data kept in the Mor Thai Marrakech databases have probative force regarding orders placed.</p>
        
        <p>Data on computer or electronic media stored regularly constitute admissible and enforceable evidence under the same terms and with the same probative force as any document received and kept in writing.</p>
      `
    },
    {
      title: "SERVICE CLIENT - RECLAMATION",
      content: `
        <p className="mb-4">Any request for information by the Client must be addressed to Mor Thai Marrakech:</p>
        
        <ul className="list-disc list-inside space-y-2">
          <li>By telephone at +212(0)524207055</li>
          <li>Via our Website referring in the "Contact" section</li>
          <li>By registered letter with acknowledgment of receipt to the following address: Mor Thai Marrakech, rue Ibn Sina Nourri Atlassi Gueliz, Marrakech, Morocco</li>
        </ul>
      `
    },
    {
      title: "INTELLECTUAL PROPERTY RIGHTS",
      content: `
        <p className="mb-4">The Establishment's brand as well as all figurative or non-figurative brands and more generally all other brands, illustrations, images and logos appearing on the Gift Vouchers, their accessories and their packaging, whether registered or not, are and will remain the exclusive property of the Establishment.</p>
        
        <p className="mb-4">Any total or partial reproduction, modification or use of these brands, illustrations, images and logos, for any reason and on any medium whatsoever, without the express prior agreement of the Establishment, is strictly prohibited and will be subject to recourse by the part of the latter.</p>
        
        <p>The same applies to any combination or conjunction with any other brand, symbol, logo and more generally any distinctive sign intended to form a composite logo. The same applies to any copyright, design, model and patent which are the property of the Establishment.</p>
      `
    },
    {
      title: "CONFIDENTIALITY OF PERSONAL DATA",
      content: `
        <p className="mb-4">All personal data collected by Mor Thai Marrakech, by whatever means, is for the reserved use of the Establishment.</p>
        
        <p>To exercise his rights, the Customer can contact the Establishment by e-mail at the following address: contact@morthai-marrakech.com</p>
      `
    },
    {
      title: "FORCE MAJEURE",
      content: `
        <p className="mb-4">The performance by the Establishment of its obligations under these General Terms and Conditions will be suspended in the event of the occurrence of a fortuitous event or force majeure in accordance with article 268 of the Dahir forming the code of obligations and contracts.</p>
        
        <p className="mb-4">The Establishment will notify the Client of the occurrence of such a fortuitous event or force majeure within 45 days from the date of occurrence of the event.</p>
        
        <p>When the suspension of the execution of the Establishment's obligations continues for a period greater than 90 days from confirmation of the date chosen for the performance of the service by the Establishment, the Client has the possibility of terminating the Order in progress and the Establishment will then reimburse the entire Order.</p>
      `
    },
    {
      title: "APPLICABLE LAW",
      content: `
        <p>The applicable law is Moroccan law for all disputes relating, in particular, to the validity, interpretation, execution or termination of these General Terms and Conditions and related contracts.</p>
      `
    },
    {
      title: "COMPETENT JURISDICTION",
      content: `
        <p>The competent court will be the Commercial Court of Marrakech in the case of a dispute between traders and similar persons (companies, branches, etc.) and will be that of the defendant's place of residence in the event of a dispute with a consumer or, choice of the applicant, of the place of actual delivery of the Gift Voucher in other cases.</p>
      `
    }
  ]

  return (
    <main className="min-h-screen">
      <PageHeroSection 
        title="General Sales Conditions"
      />

      {/* Content Section */}
      <section className="py-16 md:py-20 bg-[#fff8f5] rounded-t-xl md:rounded-t-3xl">
        <Container className="max-w-6xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <Accordion type="single" collapsible className="space-y-4">
              {sections.map((section, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-300 rounded-lg bg-white">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-colors font-trajan-pro font-bold text-gray-900">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-white text-gray-700 font-lato border-t border-gray-200">
                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Last Updated Info */}
          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900 font-lato">
              <strong>Last Updated:</strong> Novomber 17, 2025. These General Conditions of Sale are applicable to all orders placed on our website or directly with our establishment.
            </p>
          </div>
        </Container>
      </section>
    </main>
  )
}
